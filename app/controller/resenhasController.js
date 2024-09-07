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
        const erroMulter = req.session.erroMulter;
        if (!errors.isEmpty() || erroMulter != null) {

            if(!errors.isEmpty()){
                var listaErros = errors
            }else{
                var listaErros = { formatter: null, errors: [] }
            }
            if (erroMulter != null) {
                listaErros.errors.push(erroMulter)
                removeImg()

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
                // ADD FUNCTION REMOVEIMG() para o caminho salvo no banco
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
                console.log(error)
                res.status(404).render("pages/error-404.ejs");
            }

        }


    }
}

module.exports = resenhaControl