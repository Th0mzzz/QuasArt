var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const { findUserById } = require("../models/usuariosModel");
// UTIL --------------- 
const uploadPerfil = require("../util/upload")("./app/public/img/imagens-servidor/perfil/", 3, ['jpeg', 'jpg', 'png'],);

// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
}

router.get("/edit-profile", middleWares.verifyAutenticado, middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha), async function (req, res) {
    try {
        const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
        const jsonResult = {
            page: "../partial/edit-profile/index",
            pageClass: "index",
            usuario: user[0],
            modalAberto: false
        }
        res.render("./pages/edit-profile", jsonResult)
    } catch (error) {
        console.log(error)
        res.status(500).render("pages/error-500.ejs");

    }
});

router.get("/security", middleWares.verifyAutenticado, middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha), async function (req, res) {
    try {
        const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
        const jsonResult = {
            page: "../partial/edit-profile/security",
            pageClass: "security",
            usuario: user[0]
        }
        res.render("./pages/edit-profile", jsonResult)
    } catch (error) {
        console.log(error)
        res.status(500).render("pages/error-500.ejs");

    }
});

router.get("/dados-pessoais", middleWares.verifyAutenticado, middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha), async function (req, res) {
    try {
        const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
        const jsonResult = {
            page: "../partial/edit-profile/dados-pessoais",
            pageClass: "dadosPessoais",
            usuario: user[0]
        }
        res.render("./pages/edit-profile", jsonResult)
    } catch (error) {
        console.log(error)
        res.status(500).render("pages/error-500.ejs");

    }
});

router.post("/mudarFoto",
    uploadPerfil("imgPerfil"),
    function (req, res) {
        usuariosController.mudarFoto(req, res)
    }
)

module.exports = router;