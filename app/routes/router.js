var express = require("express");
const usuariosController = require("../controller/usuariosController");
var router = express.Router();

// LANDING PAGE
router.get("/", function (req, res) {
    res.render("pages/index");
});

// HOMEPAGE
router.get("/home", function (req, res) {
    res.render("pages/template-home", { page: "../partial/template-home/inicial-home" });
});

// LOGIN E CADASTRO
router.get("/entrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: null });
});

router.get("/cadastrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/cadastro", modal: "fechado", erros: null });
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

router.post("/criarConta", function (req, res) {
    usuariosController.criarUsuario(req, res)
});

module.exports = router;