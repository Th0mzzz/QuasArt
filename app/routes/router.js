var express = require("express");
const usuariosController = require("../controller/usuariosController");
const middleWares = require("../sessions/middleswares");
var router = express.Router();

// Página de falha de autenticação
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
}

// ------------ LANDING PAGE ---------------

router.get("/", function (req, res) {
    res.render("pages/index");
});

// ---------- PÁGINAS DA HOME -------------

// pagina de assinatura
router.get("/plus-page", function (req, res) {

    const jsonResult = {
        page: "../partial/template-home/plus-page",
        classePagina: "assinatura"
    }

    res.render("./pages/template-home", jsonResult)
});

// Pagina de pesquisa
router.get("/pesquisar", function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/pesquisa-home",
        classePagina: "pesquisar"
    }
    res.render("./pages/template-home", jsonResult)
});
// pagina inicial
router.get("/home", function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/inicial-home",
        classePagina: "inicialHome",
        tokenAlert: undefined
    }
    res.render("./pages/template-home", jsonResult)
});
// pagina de perfil
router.get("/profile", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    usuariosController.mostrarPageProfile(req, res)
});
router.get("/view-profile", function (req, res) {
    usuariosController.mostrarPageProfile(req, res)
});

// Publicar pages
router.get("/publicar", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/publicar-home",
        classePagina: "publicar"
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de publicar videos
router.get("/via-videos-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/videos-pub",
        classePagina: "publicar"
    }
    res.render("./pages/template-home", jsonResult)
});


// pagina de publicar fichas
router.get("/ficha-espacial-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/fichas-pub",
        classePagina: "publicar"
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de publicar resenhas
router.get("/resenha-cosmica-pub", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login", destinoDeFalha), function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/resenhas-pub",
        classePagina: "publicar"
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de videos
router.get("/videos", function (req, res) {
    const jsonResult = {
        page: "../partial/template-home/videos-home",
        classePagina: "videos"
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
            tokenAlert: {
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
    res.render("pages/template-login",jsonResult);
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

// Link para destruir sessão

router.get("/sair", middleWares.clearSession, function (req, res) {
    res.redirect("/")
})

module.exports = router;