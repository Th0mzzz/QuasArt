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
                res.render("pages/error-500")
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
                res.status(404).render("pages/error-404.ejs");
            } else {
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
            }

        } else {
            try {

                const idVideo = req.query.idVideo;
                const video = await videosModel.buscarPorId(idVideo);

                if (!video || !idVideo) {
                    console.log("video nao encontrado")
                    return res.status(404).render("pages/error-404");
                }
                const capaVideo = req.files['capaVideo'] ? req.files['capaVideo'][0].filename : video.CAPA_VIDEO;
                const videoFile = req.files['video'] ? req.files['video'][0].filename : video.CAMINHO_VIDEO;

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
                res.render("pages/error-500")
            }


        }
    },
    mostrarVideo: async (req, res) => {
        let idVideo = req.query.idVideo
        // if (!idVideo) {
        //     const videos = await pool.query("SELECT * FROM VIDEOS LIMIT 10")
        // }

        try {
            const video = await videosModel.buscarPorId(idVideo)
            if (video) {
                const autor = await usuariosModel.findUserById(video.USUARIOS_ID_USUARIO)
                if (autor) {

                    const jsonResult = {
                        video: {
                            titulo: video.NOME_VIDEO,
                            descricao: video.DESCR_VIDEO,
                            tags: video.HASHTAG_VIDEO.split(","),
                            video: video.CAMINHO_VIDEO,
                            autor: autor[0]
                        },
                    }

                    res.render("./pages/videos-home", jsonResult)
                } else {
                    res.status(404).render("pages/error-404.ejs");
                }
            } else {
                res.status(404).render("pages/error-404.ejs");
            }

        } catch (error) {
            console.log(error)
            res.status(404).render("pages/error-404.ejs");
        }

    }


}


module.exports = videoControl