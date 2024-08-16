var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
// UTIL --------------- 
const uploadCapa = require("../util/upload")("./app/public/img/imagens-servidor/capaImgs/", 3, ['jpeg', 'jpg', 'png'],);
const uploadPerfil = require("../util/upload")("./app/public/img/imagens-servidor/perfil/", 3, ['jpeg', 'jpg', 'png'],);

// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
}

router.get("/edit-profile", function (req,res){
    res.render(".")
})




module.exports = router;