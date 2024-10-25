const { body, validationResult } = require("express-validator");
const usuariosModel = require("../models/usuariosModel");
const { removeImg } = require("../util/removeImg");
const videosModel = require("../models/videosModel");

const videoControl = {
    validacaoVideo: [
        body("tituloVideo")
            .isLength({ min: 3, max: 45 }).withMessage("O título deve ter no minimo 3 caracteres e no máximo 45!")
        ,
        body("descricao")
            .isLength({ min: 3, max: 400 }).withMessage("A descrição deve ter entre 3 e 400 caracteres!")
    ],
    postarVideo: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;

        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaVideo'][0].filename}`)
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['video'][0].filename}`)
                }
            }
            console.log("errodevalidaçãovideo--------")
            console.log(listaErros)

            const jsonResult = {
                page: "../partial/template-home/pub-pages/videos-pub",
                classePagina: "publicar",
                erros: listaErros,
                valores: req.body,
                token: null,
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",

            }
            res.render("./pages/template-home", jsonResult)
        } else {
            try {
                const capaFile = req.files['capaVideo'] ? req.files['capaVideo'][0] : null;
                const videoFile = req.files['video'] ? req.files['video'][0] : null;


                const { tituloVideo, descricao, tags } = req.body
                const video = {
                    NOME_VIDEO: tituloVideo,
                    DESCR_VIDEO: descricao,
                    HASHTAG_VIDEO: [tags].toString(),
                    CAPA_VIDEO: capaFile.filename,
                    CAMINHO_VIDEO: videoFile.filename,
                    USUARIOS_ID_USUARIO: req.session.autenticado.id,
                    STATUS_VIDEO: "ativo"
                }
                const resultado = await videosModel.create(video)
                console.log(resultado)
                res.redirect(`/videos?idVideo=${resultado.insertId}`)
            } catch (error) {
                console.log(error)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaVideo'][0].filename}`)
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['video'][0].filename}`)
                }
                req.session.token = { msg: "Erro ao postar vídeo", type: "danger", contagem: 0 }
                res.redirect("/error-500")
            }


        }
    },
    atualizarVideo: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;

        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaVideo'][0].filename}`)
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['video'][0].filename}`)
                }
            }
            console.log("errodevalidaçãovideo--------")
            console.log(listaErros)

            let idVideo = req.query.idVideo
            if (!idVideo) {
                req.session.token = { msg: "Video não encontrado!", type: "danger", contagem: 0 }
                return res.redirect("/error-404")
            }
            let video = await videosModel.buscarPorId(idVideo)

            if (video.USUARIOS_ID_USUARIO != req.session.autenticado.id) {
                return res.redirect("/")
            }

            const token = null
            const jsonResult = {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/template-home/pub-pages/videos-att",
                classePagina: "publicar",
                erros: listaErros,
                token: token,
                valores: {
                    capaVideo: video.CAPA_VIDEO,
                    tituloVideo: video.NOME_VIDEO,
                    descricao: video.DESCR_VIDEO,
                    idVideo: idVideo,
                    video: video.CAMINHO_VIDEO
                },
                tags: video.HASHTAG_VIDEO.split(","),
            }
            res.render("./pages/template-home", jsonResult)


        } else {
            try {

                const idVideo = req.query.idVideo;
                const video = await videosModel.buscarPorId(idVideo);

                if (!video || !idVideo) {
                    req.session.token = { msg: "Video não encontrado!", type: "danger", contagem: 0 }
                    return res.redirect("/error-404")
                }
                const capaVideo = req.files['capaVideo'] ? req.files['capaVideo'][0].filename : video.CAPA_VIDEO;
                const videoFile = req.files['video'] ? req.files['video'][0].filename : video.CAMINHO_VIDEO;

                if(req.files){
                    if(req.files['capaVideo'][0]) removeImg(`./img/imagens-servidor/capas-img/${video.CAPA_VIDEO}`)
                    if(req.files['video'][0]) removeImg(`./img/imagens-servidor/videos/${video.CAMINHO_VIDEO}`)
                }

                const { tituloVideo, descricao, tags } = req.body

                const videoAtt = {
                    NOME_VIDEO: tituloVideo,
                    DESCR_VIDEO: descricao,
                    HASHTAG_VIDEO: [tags].toString(),
                    CAPA_VIDEO: capaVideo,
                    CAMINHO_VIDEO: videoFile,
                }
                const resultado = await videosModel.updateVideo(videoAtt, idVideo)
                console.log(resultado)
                res.redirect(`/videos?idVideo=${idVideo}`)

            } catch (error) {
                console.log("Erro ao atualizar ficha")
                console.log(error)
                const previas = req.files['previas'] ? req.files['previas'] : null;
                if (req.files) {
                    if (req.files['capaFicha'][0]) removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaFicha'][0].filename}`)
                    if (previas) {
                        for (let i = 0; i < previas.length; i++) {
                            removeImg(`./app/public/img/imagens-servidor/previas/${req.files['previas'][i].filename}`)
                        }
                    }
                }
                console.log(error)
                res.redirect("/error-500")
            }


        }
    },
    mostrarVideo: async (req, res) => {
        let idVideo = req.query.idVideo
        if (!idVideo) {
            let result = await videosModel.findRandomVideo()
            idVideo = result.ID_VIDEOS
        }
        try {
            const video = await videosModel.buscarPorId(idVideo)
            if (video) {
                const autor = await usuariosModel.findUserById(video.USUARIOS_ID_USUARIO)
                if (autor) {
                    const comentarios = await videosModel.findComentariosByIdVideo(idVideo)
                    const idsUsersComentarios = []
                    for (const c of comentarios) {
                        if (!idsUsersComentarios.includes(c.USUARIOS_ID_USUARIO)) {
                            idsUsersComentarios.push(c.USUARIOS_ID_USUARIO)
                        }
                    }
                    const usuariosComentarios = idsUsersComentarios.length > 0 ? await usuariosModel.findUsersByIds(idsUsersComentarios) : [];
                    const mapUsuariosComentarios = Object.fromEntries(usuariosComentarios.map(usuario => [usuario.ID_USUARIO, usuario]))
                    const comments = comentarios.map(c => ({
                        ...c,
                        usuario: mapUsuariosComentarios[c.USUARIOS_ID_USUARIO]
                    }))
                    const isCurtido = req.session.autenticado && req.session.autenticado.id != null ? await videosModel.verificarCurtida(idVideo, req.session.autenticado.id) : false
                    const curtidas = await videosModel.verificarCurtidasDoVideo(idVideo)
                    const token = req.session.token ? req.session.token : null
                    if (token && token.contagem < 1) {
                        req.session.token.contagem++;
                    } else {
                        req.session.token = null;
                    }

                    const jsonResult = {
                        video: {
                            ...video,
                            tags: video.HASHTAG_VIDEO.split(","),
                            autor: autor[0],
                            curtidas: curtidas
                        },
                        token: token,
                        comentarios: comments,
                        isCurtido: isCurtido
                    }

                    res.render("./pages/videos-home", jsonResult)
                } else {

                    res.redirect("/error-404")
                }
            } else {
                res.redirect("/error-404")
            }

        } catch (error) {
            console.log(error)
            res.redirect("/error-500")
        }

    },
    avaliarVideo: async (req, res) => {
        try {
            const idVideo = req.query.idVideo
            if (!idVideo) {
                req.session.token = { msg: "Video não encontrado!", type: "danger", contagem: 0 }
                return res.redirect("/error-404")
            }
            const { comentario } = req.body
            const dadosAvaliacao = {
                COMENTARIO_AVALIACAO: comentario,
                VIDEOS_ID_VIDEOS: idVideo,
                USUARIOS_ID_USUARIO: req.session.autenticado.id
            }
            await videosModel.comentarVideo(dadosAvaliacao)
            res.redirect(`/videos?idVideo=${idVideo}`)
        } catch (error) {
            console.log(error)
            res.redirect("/error-500")
        }
    }

}


module.exports = videoControl