const { body, validationResult } = require("express-validator");
const resenhaModel = require("../models/resenhasModel");
const usuariosModel = require("../models/usuariosModel");
const { removeImg } = require("../util/removeImg");

const resenhaControl = {
    validacaoResenha: [
        body("titulo")
            .isLength({ min: 3, max: 45 }).withMessage("O título deve ter no minimo 3 caracteres e no máximo 45!")
        ,
        body("descricao")
            .isLength({ min: 3, max: 400 }).withMessage("A descrição deve ter entre 3 e 400 caracteres!")
        ,
        body("textoResenha")
            .isLength({ min: 3, max: 6600 }).withMessage("A resenha deve ter entre 3 e 1200 caracteres!")
    ],
    postarResenha: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;
        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
            }
            console.log(listaErros)

            const jsonResult = {
                page: "../partial/template-home/pub-pages/resenhas-pub",
                classePagina: "publicar",
                erros: listaErros,
                valores: req.body,
                token: null,
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",

            }
            res.render("./pages/template-home", jsonResult)
        } else {
            try {
                const { titulo, descricao, textoResenha, tags } = req.body
                const resenha = {
                    TITULO_RESENHA: titulo,
                    DESCR_RESENHA: descricao,
                    TEXTO_RESENHA: textoResenha,
                    HASHTAG_RESENHA: [tags].toString(),
                    CAPA_CAMINHO: req.file.filename,
                    USUARIOS_ID_USUARIO: req.session.autenticado.id,
                }
                const resultado = await resenhaModel.criar(resenha)
                console.log(resultado)
                res.redirect(`/view-resenha?idResenha=${resultado.insertId}`)
            } catch (error) {
                console.log(error)
                if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
                res.render("pages/error-500")
            }


        }
    },
    mostrarResenha: async (req, res) => {
        const idResenha = req.query.idResenha
        if (!idResenha) {
            res.status(404).render("pages/error-404.ejs");
        } else {
            try {
                const resenha = await resenhaModel.buscarPorId(idResenha)
                if (resenha) {
                    console.log(resenha)
                    const autor = await usuariosModel.findUserById(resenha.USUARIOS_ID_USUARIO)
                    if (autor) {
                        console.log(autor)
                        const token = null
                        const jsonResult = {
                            page: "../partial/template-home/view-resenha",
                            classePagina: "",
                            resenha: {
                                titulo: resenha.TITULO_RESENHA,
                                descricao: resenha.descricao,
                                texto: resenha.TEXTO_RESENHA,
                                tags: resenha.HASHTAG_RESENHA.split(","),
                                capaResenha: resenha.CAPA_CAMINHO,
                                autor: autor[0]
                            },
                            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                            token: token
                        }

                        res.render("./pages/template-home", jsonResult)
                    } else {
                        res.status(404).render("pages/error-404.ejs");
                    }
                } else {
                    res.status(404).render("pages/error-404.ejs");
                }

            } catch (error) {
                res.status(404).render("pages/error-404.ejs");

            }

        }


    },
    atualizarResenha: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;
        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
            }
            console.log(listaErros)

            const jsonResult = {
                page: "../partial/template-home/pub-pages/resenhas-pub",
                classePagina: "publicar",
                erros: listaErros,
                valores: req.body,
                token: null,
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",

            }
            res.render("./pages/template-home", jsonResult)
        } else {
            try {
                let idResenha = req.query.idResenha
                if(!idResenha){
                    return res.status(404).render("pages/error-404.ejs");
                }
                const { titulo, descricao, textoResenha, tags } = req.body
                if (req.file) {
                    var resenha = {
                        TITULO_RESENHA: titulo,
                        DESCR_RESENHA: descricao,
                        TEXTO_RESENHA: textoResenha,
                        HASHTAG_RESENHA: [tags].toString(),
                        CAPA_CAMINHO: req.file.filename,
                    }
                } else {
                    var resenha = {
                        TITULO_RESENHA: titulo,
                        DESCR_RESENHA: descricao,
                        TEXTO_RESENHA: textoResenha,
                        HASHTAG_RESENHA: [tags].toString(),
                    }
                }
                const resultado = await resenhaModel.updateResenha(resenha)
                console.log(resultado)
                res.redirect(`/view-resenha?idResenha=${idResenha}`)
            } catch (error) {
                console.log(error)
                if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
                res.render("pages/error-500")
            }


        }
    },
}

module.exports = resenhaControl