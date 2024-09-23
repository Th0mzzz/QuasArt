var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const videoControl = require("../controller/videosController");
// UTIL --------------- 
const upload = require("../util/upload");
const uploadCapaResenha = upload("./app/public/img/imagens-servidor/capas-img/", 5, ['jpeg', 'jpg', 'png']);
const uploadMultiplo = require("../util/uploadMultiplo");
const fichasControl = require("../controller/fichasController");

// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
}

// ---------------------------------------- GETS -------------------------------------------------- 

// ---------- PÁGINAS DA HOME -------------

// pagina inicial
router.get("/", function (req, res) {
    let token = null
    if (req.session.logado == 0 && req.session.autenticado.autenticado != null) {
        let msg = "Muito bom te ter de volta,"
        if (req.session.cadastro) { msg = "Bem-vindo(a) ao Quasart," }
        token = { msg: msg, usuario: req.session.autenticado.autenticado }
        req.session.logado = req.session.logado + 1
    }

    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/inicial-home",
        classePagina: "inicialHome",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});
// pagina de assinatura
router.get("/plus-page", function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/plus-page",
        classePagina: "assinatura",
        token: token
    }

    res.render("./pages/template-home", jsonResult)
});

// Pagina de pesquisa
router.get("/pesquisar", function (req, res) {
    const token = null
    const jsonResult = {
        page: "../partial/template-home/pesquisa-home",
        classePagina: "pesquisar",
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de perfil
router.get("/profile",

    // Verificar se o idUser está sendo passado na URL. Se estiver quer dizer que não é necessário verificar se está logado ou não.
    (req, res, next) => {
        if (req.query.idUser && req.query.idUser != null) {
            usuariosController.mostrarPageProfile(req, res)
        } else {
            next()
        }
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha),
    function (req, res) {
        usuariosController.mostrarPageProfile(req, res)
    });

// pagina de gerenciamento de post

router.get("/myPosts", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/my-posts",
        classePagina: 'perfil',
        token: token

    }
    res.render("./pages/template-home", jsonResult)
});


// Home de publicações
router.get("/publicar", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/publicar-home",
        classePagina: "publicar",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});


// pagina de publicar videos
router.get("/via-videos-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/pub-pages/videos-pub",
        classePagina: "publicar",
        erros: null,
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});


// pagina de publicar fichas
router.get("/ficha-espacial-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/pub-pages/fichas-pub",
        classePagina: "publicar",
        erros: null,
        token: token,
        valores: null,
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de publicar resenhas
router.get("/resenha-cosmica-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/pub-pages/resenhas-pub",
        classePagina: "publicar",
        erros: null,
        valores: null,
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});


//Pagina sobre o quasart

router.get("/sobre", function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/sobre",
        classePagina: "",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
})

// --------- PAGINA DE VIDEOS ----------

router.get("/videos", function (req, res) {
    videoControl.mostrarVideo(req, res)
});


// -------- PÁGINAS DE VISUALIZAÇÃO -------------

router.get("/view-resenha", function (req, res) {
    resenhaControl.mostrarResenha(req, res)
});

router.get("/view-ficha", function (req, res) {
    fichasControl.mostrarFicha(req,res)
});


// Form de criação de Resenha
router.post("/criarResenha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha),
    uploadCapaResenha("capaResenha"),
    resenhaControl.validacaoResenha,
    function (req, res) {
        resenhaControl.postarResenha(req, res)
    });

router.post("/criarVideo",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha),
    uploadMultiplo([
        { name: 'capaVideo', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png'], fileSize: 5, maxCount: 1 },
        { name: 'video', caminho: './app/public/img/imagens-servidor/videos/', extensoes: ['mp4', 'avi'], fileSize: 400, maxCount: 1 }
    ]),
    videoControl.validacaoVideo,
    function (req, res) {
        videoControl.postarVideo(req, res)
    })

router.post("/criarFicha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha),
    uploadMultiplo([
        { name: 'capaFicha', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png',"webp"], fileSize: 5, maxCount: 1 },
        { name: 'previas', caminho: './app/public/img/imagens-servidor/previas/', extensoes: ['mp4', 'avi','jpeg', 'jpg', 'png'], fileSize: 200, maxCount: 8 }
    ]),
    fichasControl.validacaoFicha,
    function (req, res) {
        console.log(req.files)
        fichasControl.postarFicha(req,res)
    })


module.exports = router;