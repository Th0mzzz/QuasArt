var express = require("express");
var routerAdm = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const adminModel = require("../models/adminModel");
const usuariosModel = require("../models/usuariosModel");
const resenhaModel = require("../models/resenhasModel");
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
        try {
            const denunUsu = await adminModel.findDenunciasUsuarios()
            const denunRes = await adminModel.findDenunciasResenhas()
            const denunVid = await adminModel.findDenunciasVideos()
            const denunFic = await adminModel.findDenunciasFichas()

            const idsUsuarios = [];
            const idsResenhas = [];
            const idsVideos = [];
            const idsFichas = [];

            for (const u of [...denunUsu]) {
                if (!idsUsuarios.includes(u.ID_DENUNCIADO)) {
                    idsUsuarios.push(u.ID_DENUNCIADO);
                }
            }
            for (const r of [...denunRes]) {
                if (!idsResenhas.includes(r.USUARIOS_ID_USUARIO)) {
                    idsResenhas.push(r.USUARIOS_ID_USUARIO);
                }
            }
            for (const v of [...denunVid]) {
                if (!idsVideos.includes(v.USUARIOS_ID_USUARIO)) {
                    idsVideos.push(v.USUARIOS_ID_USUARIO);
                }
            }
            for (const f of [...denunFic]) {
                if (!idsFichas.includes(f.USUARIOS_ID_USUARIO)) {
                    idsFichas.push(f.USUARIOS_ID_USUARIO);
                }
            }


            const [usuariosDenunciados] = await Promise.all([
                idsUsuarios.length > 0 ? await usuariosModel.findUsersByIds(idsUsuarios) : [],
            ]);

            const mapUsuariosDenunciados = Object.fromEntries(usuariosDenunciados.map(usuario => [usuario.ID_USUARIO, usuario]));
            // const mapUsuariosDeResenhasDenunciados = Object.fromEntries(denun.map(usuario => [usuario.ID_USUARIO, usuario]));


            const denuncias = {
                usuarios: denunUsu.length > 0
                    ? denunUsu.map(usu => ({ ...usu, denunciado: mapUsuariosDenunciados[usu.ID_USUARIO] }))
                    : null,
                resenhas: denunRes.length > 0
                    ? denunRes
                    : null,
                videos: denunVid.length > 0
                    ? denunVid
                    : null,
                fichas: denunFic.length > 0
                    ? denunFic
                    : null,
            }
            const jsonResult = {
                page: "../partial/adm/denuncias",
                token: null,
                classePagina: "denuncias",
                denuncias: denuncias
            }
            res.render("pages/template-adm", jsonResult)
        } catch (error) {
            console.log(error)
            res.status(500).render("pages/error-500")
        }

    })

routerAdm.get("/adm-assinaturas",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {

        const jsonResult = {
            page: "../partial/adm/assinaturas",
            token: null,
            classePagina: "assinaturas",
        }
        res.render("pages/template-adm", jsonResult)
    })



// POST ---------------------------
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