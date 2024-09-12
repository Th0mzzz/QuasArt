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
                if (req.file) removeImg(`./app/public/img/imagens-servidor/videos/${req.file.filename}`)
            }
            console.log("errodevalidaçãovideo--------")
            console.log(listaErros)
            console.log(errors)
            console.log(errosMulter)

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
                const capaFile = req.files && req.files.find(file => file.fieldname === 'capaVideo') ? req.files.find(file => file.fieldname === 'capaVideo') : null;
                const videoFile = req.files && req.files.find(file => file.fieldname === 'video') ? req.files.find(file => file.fieldname === 'video') : null;
                const { titulo, descricao, tags } = req.body
                const video = {
                    NOME_VIDEO: titulo,
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
                if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
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
                            tags: video.HASHTAG_RESENHA.split(","),
                            video:video.CAMINHO_VIDEO,
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