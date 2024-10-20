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
const videosModel = require("../models/videosModel");
const fichasModel = require("../models/fichasModel");
// UTIL --------------- 

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
            const denunUsu = await adminModel.findDenuncias('DENUNCIAS_USUARIOS')
            const denunRes = await adminModel.findDenuncias('DENUNCIAS_RESENHAS')
            const denunVid = await adminModel.findDenuncias('DENUNCIAS_VIDEOS')
            const denunFic = await adminModel.findDenuncias('DENUNCIAS_FICHAS')

            const idsUsuarios = [];
            const idsResenhas = []
            const idsUsuResenhas = []
            const idsVideos = [];
            const idsUsuVideos = []
            const idsFichas = [];
            const idsUsuFichas = []


            //criar array dos ids dos usuarios das denuncias
            for (const u of [...denunUsu]) {
                if (!idsUsuarios.includes(u.ID_DENUNCIADO)) {
                    idsUsuarios.push(u.ID_DENUNCIADO);
                }
            }
            //criar array dos ids das resenhas das denuncias
            for (const r of [...denunRes]) {
                if (!idsResenhas.includes(r.RESENHAS_ID_RESENHAS)) {
                    idsResenhas.push(r.RESENHAS_ID_RESENHAS);
                }
            }
            for (const v of [...denunVid]) {
                if (!idsVideos.includes(v.VIDEOS_ID_VIDEOS)) {
                    idsVideos.push(v.VIDEOS_ID_VIDEOS);
                }
            }
            for (const f of [...denunFic]) {
                if (!idsFichas.includes(f.FICHAS_ID_OBRA)) {
                    idsFichas.push(f.FICHAS_ID_OBRA);
                }
            }


            const [usuariosDenunciados, resenhasDenunciadas, videosDenunciados, fichasDenunciadas] = await Promise.all([
                idsUsuarios.length > 0 ? await usuariosModel.findUsersByIds(idsUsuarios) : [],
                idsResenhas.length > 0 ? await resenhaModel.findResenhasByIds(idsResenhas) : [],
                idsVideos.length > 0 ? await videosModel.findVideosByIds(idsVideos) : [],
                idsFichas.length > 0 ? await fichasModel.findFichasByIds(idsFichas) : [],
            ]);
            // criar um array de ids de usuarios das resenhas denunciadas
            for (const resenha of [...resenhasDenunciadas]) {
                if (!idsUsuResenhas.includes(resenha.USUARIOS_ID_USUARIO)) {
                    idsUsuResenhas.push(resenha.USUARIOS_ID_USUARIO);
                }
            }
            // criar um array de ids de usuarios dos videos denunciadas

            for (const video of [...videosDenunciados]) {
                if (!idsUsuVideos.includes(video.USUARIOS_ID_USUARIO)) {
                    idsUsuVideos.push(video.USUARIOS_ID_USUARIO);
                }
            }
            // criar um array de ids de usuarios das fichas denunciadas
            for (const ficha of [...fichasDenunciadas]) {
                if (!idsUsuFichas.includes(ficha.USUARIOS_ID_USUARIO)) {
                    idsUsuFichas.push(ficha.USUARIOS_ID_USUARIO);
                }
            }

            const [usuariosDasResenhas, usuariosDasFichas, usuariosDosVideos] = await Promise.all([
                idsUsuResenhas.length > 0 ? await usuariosModel.findUsersByIds(idsUsuResenhas) : [],
                idsUsuFichas.length > 0 ? await usuariosModel.findUsersByIds(idsUsuFichas) : [],
                idsUsuVideos.length > 0 ? await usuariosModel.findUsersByIds(idsUsuVideos) : [],
            ]);
            const mapUsuariosDenunciados = Object.fromEntries(usuariosDenunciados.map(usuario => [usuario.ID_USUARIO, usuario]));
            const mapResenhasDenunciadas = Object.fromEntries(resenhasDenunciadas.map(resenha => [resenha.ID_RESENHAS, resenha]));
            const mapUsuariosDasResenhas = Object.fromEntries(usuariosDasResenhas.map(usuario => [usuario.ID_USUARIO, usuario]));
            const mapVideosDenunciados = Object.fromEntries(videosDenunciados.map(video => [video.ID_VIDEOS, video]));
            const mapUsuariosDosVideos = Object.fromEntries(usuariosDosVideos.map(usuario => [usuario.ID_USUARIO, usuario]));
            const mapFichasDenunciadas = Object.fromEntries(fichasDenunciadas.map(ficha => [ficha.ID_OBRA, ficha]));
            const mapUsuariosDasFichas = Object.fromEntries(usuariosDasFichas.map(usuario => [usuario.ID_USUARIO, usuario]));

            const denuncias = {
                usuarios: denunUsu.length > 0
                    ? denunUsu.map(denuncia => ({ ...denuncia, usuario: mapUsuariosDenunciados[denuncia.ID_DENUNCIADO] }))
                    : null,
                resenhas: denunRes.length > 0
                    ? denunRes.map(denuncia => ({
                        ...denuncia,
                        resenha: {
                            ...mapResenhasDenunciadas[denuncia.RESENHAS_ID_RESENHAS],
                            usuario: mapUsuariosDasResenhas[mapResenhasDenunciadas[denuncia.RESENHAS_ID_RESENHAS].USUARIOS_ID_USUARIO]
                        }
                    }))
                    : null,
                videos: denunVid.length > 0
                    ? denunVid.map(denuncia => ({
                        ...denuncia,
                        video: {
                            ...mapVideosDenunciados[denuncia.VIDEOS_ID_VIDEOS],
                            usuario: mapUsuariosDosVideos[mapVideosDenunciados[denuncia.VIDEOS_ID_VIDEOS].USUARIOS_ID_USUARIO]
                        }
                    }))
                    : null,
                fichas: denunFic.length > 0
                    ? denunFic.map(denuncia => ({
                        ...denuncia,
                        ficha: {
                            ...mapFichasDenunciadas[denuncia.FICHAS_ID_OBRA],
                            usuario: mapUsuariosDasFichas[mapFichasDenunciadas[denuncia.FICHAS_ID_OBRA].USUARIOS_ID_USUARIO]
                        }
                    }))
                    : null,
            }


            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            const jsonResult = {
                page: "../partial/adm/denuncias",
                token: token,
                classePagina: "denuncias",
                denuncias: denuncias
            }
            res.render("pages/template-adm", jsonResult)
        } catch (error) {
            console.log(error)
            res.status(500).render("pages/error-500")
        }

    })

routerAdm.get("/adm-posts",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const resenhas = await adminModel.findAllPosts("RESENHAS")
        const fichas = await adminModel.findAllPosts("FICHAS")
        const videos = await adminModel.findAllPosts("VIDEOS")
        const idsUsuResenhas = []
        const idsUsuFichas = []
        const idsUsuVideos = []

        for (const r of [...resenhas]) {
            if (!idsUsuResenhas.includes(r.USUARIOS_ID_USUARIO)) {
                idsUsuResenhas.push(r.USUARIOS_ID_USUARIO);
            }
        }
        for (const f of [...fichas]) {
            if (!idsUsuFichas.includes(f.USUARIOS_ID_USUARIO)) {
                idsUsuFichas.push(f.USUARIOS_ID_USUARIO);
            }
        }
        for (const v of [...videos]) {
            if (!idsUsuVideos.includes(v.USUARIOS_ID_USUARIO)) {
                idsUsuVideos.push(v.USUARIOS_ID_USUARIO);
            }
        }

        const [usuariosDasResenhas, usuariosDasFichas, usuariosDosVideos] = await Promise.all([
            idsUsuResenhas.length > 0 ? await usuariosModel.findUsersByIds(idsUsuResenhas) : [],
            idsUsuFichas.length > 0 ? await usuariosModel.findUsersByIds(idsUsuFichas) : [],
            idsUsuVideos.length > 0 ? await usuariosModel.findUsersByIds(idsUsuVideos) : [],
        ]);

        const mapUsuariosDasResenhas = Object.fromEntries(usuariosDasResenhas.map(usuario => [usuario.ID_USUARIO, usuario]));
        const mapUsuariosDosVideos = Object.fromEntries(usuariosDosVideos.map(usuario => [usuario.ID_USUARIO, usuario]));
        const mapUsuariosDasFichas = Object.fromEntries(usuariosDasFichas.map(usuario => [usuario.ID_USUARIO, usuario]));

        const posts = {
            resenhas: resenhas.length > 0
                ? resenhas.map(resenha => ({ ...resenha, usuario: mapUsuariosDasResenhas[resenha.USUARIOS_ID_USUARIO] }))
                : null,
            fichas: fichas.length > 0
                ? fichas.map(ficha => ({ ...ficha, usuario: mapUsuariosDasFichas[ficha.USUARIOS_ID_USUARIO] }))
                : null,
            videos: videos.length > 0
                ? videos.map(video => ({ ...video, usuario: mapUsuariosDosVideos[video.USUARIOS_ID_USUARIO] }))
                : null
        }
        let token = req.session.token ? req.session.token : null;
        if (token && token.contagem < 1) {
            req.session.token.contagem++;
        } else {
            req.session.token = null;
        }

        const jsonResult = {
            page: "../partial/adm/posts",
            token: token,
            classePagina: "posts",
            posts: posts
        }
        res.render("pages/template-adm", jsonResult)
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
routerAdm.post("/inativarResenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar a resenha!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await resenhaModel.updateResenha(idPost, { STATUS_RESENHA: "inativo" })
        req.session.token = { msg: "Resenha inativada!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/ativarResenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar a resenha!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await resenhaModel.updateResenha(idPost, { STATUS_RESENHA: "ativo" })
        req.session.token = { msg: "Resenha ativada!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/inativarFicha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar a ficha!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await fichasModel.updateFicha(idPost, { STATUS_FICHA: "inativo" })
        req.session.token = { msg: "Ficha inativada!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/ativarFicha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar a ficha!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await fichasModel.updateFicha(idPost, { STATUS_FICHA: "ativo" })
        req.session.token = { msg: "Ficha ativada!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/inativarVideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar o video!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await videosModel.updateVideo({ STATUS_VIDEO: "inativo" }, idPost)
        req.session.token = { msg: "Video inativado!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/ativarVideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idPost = req.query.idPost
        if (!idPost) {
            req.session.token = { msg: "Erro ao encontrar o video!", type: 'danger', contagem: 0 }
            return res.redirect("/adm-posts")
        }
        await videosModel.updateVideo({ STATUS_VIDEO: "ativo" }, idPost)
        req.session.token = { msg: "Video ativado!", type: 'success', contagem: 0 }

        res.redirect("/adm-posts")
    })
routerAdm.post("/concluirDenunciaUsuario",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idDenuncia = req.query.idDenuncia
        if (!idDenuncia) {
            req.session.token = { msg: 'Erro ao encontrar denúncia!', type: 'danger', contagem: 0 }

            return res.redirect("/adm-denuncias")
        }
        try {
            const isConcluida = await adminModel.verifyStatusDenuncia('DENUNCIAS_USUARIOS', idDenuncia)
            if (isConcluida) {
                req.session.token = { msg: 'Denúncia reativada!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_USUARIOS', { STATUS_DENUNCIA: 'pendente' }, idDenuncia)
            } else {
                req.session.token = { msg: 'Denúncia concluida!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_USUARIOS', { STATUS_DENUNCIA: 'concluida' }, idDenuncia)
            }

            res.redirect("/adm-denuncias")
        } catch (error) {
            req.session.token = { msg: 'Erro ao alterar denúncia!', type: 'danger', contagem: 0 }
            res.redirect(`/adm-denuncias`)
        }
    })
routerAdm.post("/concluirDenunciaResenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idDenuncia = req.query.idDenuncia
        if (!idDenuncia) {
            req.session.token = { msg: 'Erro ao encontrar denúncia!', type: 'danger', contagem: 0 }

            return res.redirect("/adm-denuncias")
        }
        try {
            const isConcluida = await adminModel.verifyStatusDenuncia('DENUNCIAS_RESENHAS', idDenuncia)
            if (isConcluida) {
                req.session.token = { msg: 'Denúncia reativada!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_RESENHAS', { STATUS_DENUNCIA: 'pendente' }, idDenuncia)
            } else {
                req.session.token = { msg: 'Denúncia concluida!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_RESENHAS', { STATUS_DENUNCIA: 'concluida' }, idDenuncia)
            }

            res.redirect("/adm-denuncias")
        } catch (error) {
            req.session.token = { msg: 'Erro ao alterar denúncia!', type: 'danger', contagem: 0 }
            res.redirect(`/adm-denuncias`)
        }
    })
routerAdm.post("/concluirDenunciaFicha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idDenuncia = req.query.idDenuncia
        if (!idDenuncia) {
            req.session.token = { msg: 'Erro ao encontrar denúncia!', type: 'danger', contagem: 0 }

            return res.redirect("/adm-denuncias")
        }
        try {
            const isConcluida = await adminModel.verifyStatusDenuncia('DENUNCIAS_FICHAS', idDenuncia)
            if (isConcluida) {
                req.session.token = { msg: 'Denúncia reativada!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_FICHAS', { STATUS_DENUNCIA: 'pendente' }, idDenuncia)
            } else {
                req.session.token = { msg: 'Denúncia concluida!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_FICHAS', { STATUS_DENUNCIA: 'concluida' }, idDenuncia)
            }

            res.redirect("/adm-denuncias")
        } catch (error) {
            req.session.token = { msg: 'Erro ao alterar denúncia!', type: 'danger', contagem: 0 }
            res.redirect(`/adm-denuncias`)
        }
    })
routerAdm.post("/concluirDenunciaVideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/sem-permissao", destinoDeFalha, [4]),
    async function (req, res) {
        const idDenuncia = req.query.idDenuncia
        if (!idDenuncia) {
            req.session.token = { msg: 'Erro ao encontrar denúncia!', type: 'danger', contagem: 0 }

            return res.redirect("/adm-denuncias")
        }
        try {
            const isConcluida = await adminModel.verifyStatusDenuncia('DENUNCIAS_VIDEOS', idDenuncia)
            if (isConcluida) {
                req.session.token = { msg: 'Denúncia reativada!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_VIDEOS', { STATUS_DENUNCIA: 'pendente' }, idDenuncia)
            } else {
                req.session.token = { msg: 'Denúncia concluida!', type: 'success', contagem: 0 }
                await adminModel.updateDenuncia('DENUNCIAS_VIDEOS', { STATUS_DENUNCIA: 'concluida' }, idDenuncia)
            }

            res.redirect("/adm-denuncias")
        } catch (error) {
            req.session.token = { msg: 'Erro ao alterar denúncia!', type: 'danger', contagem: 0 }
            res.redirect(`/adm-denuncias`)
        }
    })



module.exports = routerAdm;