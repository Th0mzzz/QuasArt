var express = require("express");
const usuariosController = require("../controller/usuariosController");
var router = express.Router();

// LANDING PAGE
router.get("/", function (req, res) {
    res.render("pages/index");
});

router.get("/plus-page", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/plus-page", classePagina: "assinatura" })
});
// HOMEPAGE
router.get("/pesquisar", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/pesquisa-home", classePagina: "pesquisar" })
});
router.get("/home", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/inicial-home", classePagina: "inicialHome" })
});
router.get("/profile", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/perfil-home", classePagina: "perfil" })
});
// publicar pages
router.get("/publicar", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/publicar-home", classePagina: "publicar" })
});
router.get("/via-videos-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/videos-pub", classePagina: "publicar" })
});
router.get("/ficha-espacial-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/ficha-pub", classePagina: "publicar" })
});
router.get("/resenha-cosmica-pub", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/resenha-pub", classePagina: "publicar" })
});


// videos
router.get("/videos", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/videos-home", classePagina: "videos" })
});

// LOGIN E CADASTRO
router.get("/entrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: null, valores: "", incorreto: "" });
});

router.get("/cadastrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/cadastro", modal: "fechado", erros: null, valores: "" });
});
router.get("/esqueceuSenha", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/esqueceuSenha", modal: "fechado", erros: null });
});


router.get("/enviarEmail", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/esqueceuSenha", modal: "aberto", erros: null });
})
router.post("/checarToken", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/redefinir", modal: "fechado", erros: null });
})

// Router do FORM de cadastro que chama o Controle de Usuários e cadastra o usuário  

router.post("/criarConta", usuariosController.regrasValidacaoCriarConta, function (req, res) {
    usuariosController.criarUsuario(req, res)
});

// Router do FORM de login que chama o controle de usuários e valida e verifica no banco se o usuário digitado existe
router.post("/logarConta", usuariosController.regrasValidacaoEntrar, function (req, res) {
    usuariosController.entrar(req, res)
})

module.exports = router;