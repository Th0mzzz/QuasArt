var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index");
});

router.get("/entrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/login" });
});

router.get("/cadastrar", function (req, res) {
    res.render("pages/template-login", { page: "../partial/template-login/cadastro" });
});
module.exports = router;