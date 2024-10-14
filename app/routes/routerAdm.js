var express = require("express");
var routerAdm = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const adminModel = require("../models/adminModel");
const usuariosModel = require("../models/usuariosModel");
// UTIL --------------- 
const uploadCapa = require("../util/upload")("./app/public/img/imagens-servidor/capaImgs/", 3, ['jpeg', 'jpg', 'png'],);
const uploadPerfil = require("../util/upload")("./app/public/img/imagens-servidor/perfil/", 3, ['jpeg', 'jpg', 'png'],);

// Página de falha de autenticação ---------
const destinoDeFalha = {
}

routerAdm.get("/adm",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    function (req, res) {
        res.render("pages/template-adm", { page: "../partial/adm/index", token: null, classePagina: "index" })
    })

routerAdm.get("/adm-users",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const users = await adminModel.findAllUsers()
        res.render("pages/template-adm", { page: "../partial/adm/users", token: null, classePagina: "users", usuarios: users })
    })

routerAdm.get("/adm-denuncias",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {

        res.render("pages/template-adm", { page: "../partial/adm/denuncias", token: null, classePagina: "denuncias" })
    })

routerAdm.get("/adm-assinaturas",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {

        res.render("pages/template-adm", { page: "../partial/adm/assinaturas", token: null, classePagina: "assinaturas" })
    })

routerAdm.post("/inativarUser",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idUser = req.query.idUser
        if (!idUser) {
            const users = await adminModel.findAllUsers()
            return res.render("pages/template-adm", { page: "../partial/adm/users", token: { msg: "Nenhum usuário encontrado!", type: "danger" }, classePagina: "users", usuarios: users })
        }
        await usuariosModel.updateUser({ STATUS_USUARIO: "inativo" }, idUser)
        const users = await adminModel.findAllUsers()
        res.render("pages/template-adm", { page: "../partial/adm/users", token: { msg: "Usuário inativado com sucesso", type: "success" }, classePagina: "users", usuarios: users })
    })

routerAdm.post("/ativarUser",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idUser = req.query.idUser
        if (!idUser) {
            const users = await adminModel.findAllUsers()
            return res.render("pages/template-adm", { page: "../partial/adm/users", token: { msg: "Nenhum usuário encontrado!", type: "danger" }, classePagina: "users", usuarios: users })
        }
        await usuariosModel.updateUser({ STATUS_USUARIO: "ativo" }, idUser)
        const users = await adminModel.findAllUsers()
        res.render("pages/template-adm", { page: "../partial/adm/users", token: { msg: "Usuário ativado com sucesso", type: "success" }, classePagina: "users", usuarios: users })
    })


module.exports = routerAdm;