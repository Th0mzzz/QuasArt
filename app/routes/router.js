var express = require("express");
const usuariosController = require("../controller/usuariosController");
const middleWares = require("../sessions/middleswares");
var router = express.Router();

// ------------ LANDING PAGE ---------------

router.get("/", function (req, res) {
    res.render("pages/index");
});

// ---------- PÁGINAS DA HOME -------------

// pagina de assinatura
router.get("/plus-page", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/plus-page", classePagina: "assinatura" })
});

// Pagina de pesquisa
router.get("/pesquisar", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/pesquisa-home", classePagina: "pesquisar" })
});
// pagina inicial
router.get("/home", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/inicial-home", classePagina: "inicialHome", tokenAlert: undefined })
});
// pagina de perfil
router.get("/profile", middleWares.verifyAutenticado, middleWares.verifyAutorizado("pages/template-login",
    {
        page: "../partial/template-login/login", modal: "fechado", erros: null, valores: "", incorreto: ""
    }
), function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/perfil-home", classePagina: "perfil", idUsuario: req.session.autenticado.id })
});
// Pagina de view perfil
router.get("/view-profile", function (req, res) {

});
// Publicar pages
router.get("/publicar", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/publicar-home", classePagina: "publicar" })
});
// pagina de publicar videos
router.get("/via-videos-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/videos-pub", classePagina: "publicar" })
});

// pagina de publicar fichas
router.get("/ficha-espacial-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/fichas-pub", classePagina: "publicar" })
});
// pagina de publicar resenhas
router.get("/resenha-cosmica-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/resenhas-pub", classePagina: "publicar" })
});

// pagina de videos
router.get("/videos", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/videos-home", classePagina: "videos" })
});

// ------------ LOGIN E CADASTRO ---------------
// pagina de login
router.get("/entrar", function (req, res) {
    if (req.session.autenticado && req.session.autenticado.autenticado) {
        res.render("pages/template-home", { page: "../partial/template-home/inicial-home", classePagina: "inicialHome", tokenAlert: { msg: `Bom te ver de novo`, usuario: `${req.session.autenticado.autenticado}!` } })

    } else {
        res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: null, valores: "", incorreto: "" });
    }
});
//  pagina de cadastro
router.get("/cadastrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/cadastro", modal: "fechado", erros: null, valores: "" });
});
// pagina de esqueceu a senha
router.get("/esqueceuSenha", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/esqueceuSenha", modal: "fechado", erros: null });
});

// formulario para enviar email
router.get("/enviarEmail", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/esqueceuSenha", modal: "aberto", erros: null });
})
// form para checar se o valor do token é correto
router.post("/checarToken", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/redefinir", modal: "fechado", erros: null });
})

// Router do FORM de cadastro que chama o Controle de Usuários e cadastra o usuário  

router.post("/criarConta", usuariosController.regrasValidacaoCriarConta, middleWares.gravarAutenticacao, function (req, res) {
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