const { body, validationResult } = require("express-validator");
const resenhaModel = require("../models/resenhasModel");

const resenhaControl = {
    validacaoResenha: [
        body("titulo")
            .isLength({ min: 3, max: 45 }).withMessage("O título deve ter no minimo 3 caracteres e no máximo 45!")
        ,
        body("descricao")
            .isLength({ min: 3, max: 400 }).withMessage("A descrição deve ter entre 3 e 400 caracteres!")
        ,
        body("textoResenha")
            .isLength({ min: 3, max: 1200 }).withMessage("A resenha deve ter entre 3 e 1200 caracteres!")
    ],
    postarResenha: async (req, res) => {
        let errors = validationResult(req)
        const erroMulter = req.session.erroMulter;

        if (!errors.isEmpty() || erroMulter != null) {
            listaErros = !errors.isEmpty ? errors : {formatter:null, errors: []};
            if(erroMulter != null){
                listaErros.errors.push(erroMulter)
            }
            const jsonResult = {
                page: "../partial/template-home/pub-pages/resenhas-pub",
                classePagina: "publicar",
                erros: listaErros
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
                res.redirect("/")
            } catch (error) {
                console.log(error)
                res.render("pages/error-500")
            }


        }
    },
    mostrarResenha: async(req,res) =>{

    }
}

module.exports = resenhaControl