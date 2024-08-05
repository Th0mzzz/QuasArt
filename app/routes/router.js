var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
// UTIL --------------- 
const uploadCapa = require("../util/upload")("./app/public/img/imagens-servidor/", 3, ['jpeg', 'jpg', 'png'],);
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
router.get("/" , function (req, res) {
    const token = req.session.logado == 0 && req.session.autenticado.autenticado != null ? { msg:"Bem-vindo ao Quasart!", usuario: req.session.autenticado.autenticado} : null
    const jsonResult = {
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
        page: "../partial/template-home/pub-pages/fichas-pub",
        classePagina: "publicar",
        erros: null,
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de publicar resenhas
router.get("/resenha-cosmica-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const token = null
    const jsonResult = {
        page: "../partial/template-home/pub-pages/resenhas-pub",
        classePagina: "publicar",
        erros: null,
        token: token
    }
    res.render("./pages/template-home", jsonResult)
});


//Pagina sobre o quasart

router.get("/sobre", function (req, res) {
    const token = null
    const jsonResult = {
        page: "../partial/template-home/sobre",
        classePagina: "",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
})

// --------- PAGINA DE VIDEOS ----------
router.get("/videos", function (req, res) {
    res.render("./pages/videos-home")
});


// -------- PÁGINAS DE VISUALIZAÇÃO -------------

router.get("/view-resenha", function (req, res) {
    resenhaControl.mostrarResenha(req, res)
});

router.get("/view-ficha", function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/view-ficha",
        classePagina: "",
        erros: null
    }
    res.render("./pages/template-home", jsonResult)
});

// ------------ LOGIN E CADASTRO ---------------
// pagina de login
router.get("/entrar", function (req, res) {

    if (req.session.autenticado && req.session.autenticado.autenticado && req.session.autenticado.autenticado != null) {
        const jsonResult = {
            page: "../partial/template-home/inicial-home",
            classePagina: "inicialHome",
            token: {
                msg: `Bom te ver de novo`,
                usuario: `${req.session.autenticado.autenticado}!`
            }
        }
        res.render("pages/template-home", jsonResult)

    } else {
        res.render("pages/template-login", destinoDeFalha);
    }
});
//  pagina de cadastro
router.get("/cadastrar", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/cadastro",
        modal: "fechado",
        erros: null,
        valores: ""
    }
    res.render("pages/template-login", jsonResult);
});
// pagina de esqueceu a senha
router.get("/esqueceuSenha", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/esqueceuSenha",
        modal: "fechado",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
});

// formulario para enviar email
router.get("/enviarEmail", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/esqueceuSenha",
        modal: "aberto",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
})

// Link para destruir sessão
router.get("/sair", middleWares.clearSession, function (req, res) {
    res.redirect("/")
})

// --------------------------------- POSTS --------------------------------- //


// form para checar se o valor do token é correto
router.post("/checarToken", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/redefinir",
        modal: "fechado",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
})

// Router do FORM de cadastro que chama o Controle de Usuários e cadastra o usuário  

router.post("/criarConta", usuariosController.regrasValidacaoCriarConta, function (req, res) {
    usuariosController.criarUsuario(req, res)
});

// Router do FORM de login que chama o controle de usuários e valida e verifica no banco se o usuário digitado existe
router.post("/logarConta", usuariosController.regrasValidacaoEntrar, middleWares.gravarAutenticacao, function (req, res) {
    usuariosController.entrar(req, res)
})


// Form de criação de Resenha

router.post("/criarResenha", uploadCapa("capaResenha"), resenhaControl.validacaoResenha, function (req, res) {
    resenhaControl.postarResenha(req, res)
})


module.exports = router;