var express = require("express");
const usuariosController = require("../controller/usuariosController");
var router = express.Router();

// LANDING PAGE
router.get("/", function (req, res) {
    res.render("pages/index");
});

// HOMEPAGE
router.get("/home", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/inicial-home" , classePagina: "inicialHome"})
});
router.get("/profile", function (req, res) {
    res.render("./pages/template-home", { page: "../partial/template-home/perfil-home" , classePagina: "perfil"})
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
}); 0

module.exports = router;