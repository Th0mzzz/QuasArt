var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index");
});

router.get("/entrar", function (req, res){
    res.render("pages/entrar");
});

router.get("/cadastrar", function (req, res){
    res.render("pages/cadastrar");
});
module.exports = router;