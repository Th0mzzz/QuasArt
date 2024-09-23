const { body, validationResult } = require("express-validator");
const usuariosModel = require("../models/usuariosModel");
const { removeImg } = require("../util/removeImg");
const fichasModel = require("../models/fichasModel");


const fichasControl = {
    validacaoFicha: [
        body("nomeObra")
            .isLength({ min: 8, max: 60 }).withMessage("O nome deve ter entre 8 e 60 caracteres!"),
        body("sinopse")
            .isLength({ min: 25, max: 400 }).withMessage("O nome deve ter entre 25 e 400 caracteres!")
    ],
    postarFicha: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;
        console.log("Erros de validação:", errors.array());
        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;
            const previas = req.files['previas'] ? req.files['previas'] : null;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaFicha'][0].filename}`)
                    if (previas) {
                        for (let i = 0; i < previas.length; i++){
                            removeImg(`./app/public/img/imagens-servidor/previas/${req.files['previas'][i].filename}`)
                        }
                    }
                }
            }
            console.log("---------erro-de-validação-ficha--------")
            console.log(listaErros)

            const jsonResult = {
                page: "../partial/template-home/pub-pages/fichas-pub",
                classePagina: "publicar",
                erros: listaErros,
                valores: req.body,
                token: null,
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            }
            res.render("./pages/template-home", jsonResult)


        } else {
            try {

                const capaFicha = req.files['capaFicha'] ? req.files['capaFicha'][0] : null;
                const previas = req.files['previas'] ? req.files['previas'] : [];
                console.log("FICHASCONTROLLER -------------------------------")
                console.log(previas)
                console.log(req.files)

                const dataAtual = new Date();

                const ano = dataAtual.getFullYear();
                const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
                const dia = String(dataAtual.getDate()).padStart(2, '0');

                const dataFormatada = `${ano}-${mes}-${dia}`;
                const { nomeObra, sinopse, tags } = req.body
                const ficha = {
                    NOME_OBRA: nomeObra,
                    DESCR_OBRA: sinopse,
                    HASHTAG_OBRA: [tags].toString(),
                    CAMINHO_CAPA: capaFicha.filename,
                    USUARIOS_ID_USUARIO: req.session.autenticado.id,
                    DATA_FICHA: dataFormatada
                }
                const resultado = await fichasModel.createFicha(ficha)
                console.log(resultado)

                await Promise.all(previas.map(async (previa) => {
                    const previaResult = await fichasModel.createPrevia({
                        CAMINHO_PREVIA: previa.filename,
                        FICHAS_ID_OBRA: resultado.insertId
                    });
                    console.log(previaResult);
                }));


                res.redirect(`/view-ficha?idFicha=${resultado.insertId}`)
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
    mostrarFicha: async (req, res) => {
        const idFicha = req.query.idFicha
        if (!idFicha) {
            res.status(404).render("pages/error-404.ejs");
        } else {
            try {
                const ficha = await fichasModel.findFichaByIdObra(idFicha)
                console.log("----------- VIEW FICHA ----------")
                console.log(ficha)
                if (ficha) {
                    console.log("----------- AUTOR ----------")
                    const autor = await usuariosModel.findUserById(ficha.USUARIOS_ID_USUARIO)
                    console.log(autor)
                    if (autor) {
                        console.log("----------- PREVIAS ----------")

                        const previas = await fichasModel.findPreviasByIdObra(ficha.ID_OBRA)
                        console.log(previas)
                        const token = null
                        const jsonResult = {
                            page: "../partial/template-home/view-ficha",
                            classePagina: "",
                            ficha: ficha,
                            previas: previas,
                            tags: ficha.HASHTAG_OBRA.split(","),
                            autor: autor[0],
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


module.exports = fichasControl