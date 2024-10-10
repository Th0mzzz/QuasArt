const { body, validationResult } = require("express-validator");
const usuariosModel = require("../models/usuariosModel");
const { removeImg } = require("../util/removeImg");
const fichasModel = require("../models/fichasModel");


const fichasControl = {
    validacaoFicha: [
        body("nomeObra")
            .isLength({ min: 8, max: 100 }).withMessage("O nome deve ter entre 8 e 60 caracteres!"),
        body("sinopse")
            .isLength({ min: 25, max: 1400 }).withMessage("O nome deve ter entre 25 e 1400 caracteres!")
    ],
    postarFicha: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;

        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;
            const previas = req.files['previas'] ? req.files['previas'] : null;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaFicha'][0].filename}`)
                    if (previas) {
                        for (let i = 0; i < previas.length; i++) {
                            removeImg(`./app/public/img/imagens-servidor/previas/${req.files['previas'][i].filename}`)
                        }
                    }
                }
            }
            console.log("---------( erro-de-validação-ficha )--------")

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
                console.log("---------( FICHASCONTROLLER )---------")
                console.log(previas)


                const dataAtual = new Date();
                const ano = dataAtual.getFullYear();
                const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
                const dia = String(dataAtual.getDate()).padStart(2, '0');

                const dataFormatada = `${ano}-${mes}-${dia}`;
                const { nomeObra, sinopse, tags } = req.body
                const ficha = {
                    NOME_OBRA: nomeObra,
                    DESCR_OBRA: sinopse,
                    HASHTAG_OBRA: [tags].toString() != '' ? [tags].toString() : null,
                    CAMINHO_CAPA: capaFicha.filename,
                    USUARIOS_ID_USUARIO: req.session.autenticado.id,
                    DATA_FICHA: dataFormatada
                }
                const resultado = await fichasModel.createFicha(ficha)
                console.log(resultado)

                await Promise.all(previas.map(async (previa) => {
                    await fichasModel.createPrevia({
                        CAMINHO_PREVIA: previa.filename,
                        FICHAS_ID_OBRA: resultado.insertId
                    });
                }));


                res.redirect(`/view-ficha?idFicha=${resultado.insertId}`)
            } catch (error) {
                console.log(error)
                const previas = req.files['previas'] ? req.files['previas'] : null;
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaFicha'][0].filename}`)
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
    atualizarFicha: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;

        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;
            const previas = req.files['previas'] ? req.files['previas'] : null;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {

                    if (req.files['capaFicha'][0]) removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['capaFicha'][0].filename}`)
                    if (previas) {
                        for (let i = 0; i < previas.length; i++) {
                            removeImg(`./app/public/img/imagens-servidor/previas/${req.files['previas'][i].filename}`)
                        }
                    }
                }
            }
            console.log("---------( erro-de-validação-ficha )--------")
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

                const idFicha = req.query.idFicha;
                const ficha = await fichasModel.findFichaByIdObra(idFicha);

                if (!ficha) {
                    return res.status(404).render("pages/error-404");
                }
                const capaFicha = req.files['capaFicha'] ? req.files['capaFicha'][0].filename : ficha.CAMINHO_CAPA;
                const previas = req.files['previas'] ? req.files['previas'].map(previa => previa.filename) : null;

                console.log("---------( FICHASCONTROLLER )---------")
                console.log(previas)
                const { nomeObra, sinopse, tags } = req.body

                const dadosFicha = {
                    NOME_OBRA: nomeObra,
                    DESCR_OBRA: sinopse,
                    HASHTAG_OBRA: [tags].toString() != '' ? [tags].toString() : null,
                    CAMINHO_CAPA: capaFicha,
                }
                const resultado = await fichasModel.updateFicha(idFicha, dadosFicha)
                console.log(resultado)

                if (previas) {
                    const apagarResult = await fichasModel.deletePreviasPorIdObra(idFicha);
                    console.log("apagando previas")
                    console.log(apagarResult)
                    await Promise.all(previas.map(async (filename) => {
                        await fichasModel.createPrevia({
                            CAMINHO_PREVIA: filename,
                            FICHAS_ID_OBRA: idFicha
                        });
                    }));
                }


                res.redirect(`/view-ficha?idFicha=${idFicha}`)
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
    mostrarFicha: async (req, res) => {
        const idFicha = req.query.idFicha
        if (!idFicha) {
            res.status(404).render("pages/error-404.ejs");
        } else {
            try {
                const ficha = await fichasModel.findFichaByIdObra(idFicha)
                if (ficha) {
                    const autor = await usuariosModel.findUserById(ficha.USUARIOS_ID_USUARIO)
                    if (autor) {
                        const previas = await fichasModel.findPreviasByIdObra(ficha.ID_OBRA)
                        const comentarios = await fichasModel.findComentariosByIdObra(ficha.ID_OBRA)
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

                        const token = null
                        const jsonResult = {
                            page: "../partial/template-home/view-ficha",
                            classePagina: "",
                            ficha: ficha,
                            previas: previas,
                            tags: ficha.HASHTAG_OBRA.split(","),
                            autor: autor[0],
                            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                            token: token,
                            comentarios: comments
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


    },
    avaliarFicha: async (req, res) => {
        try {
            const idFicha = req.query.idFicha
            if (!idFicha) {
                return res.status(404).render("pages/error-404")
            }
            const { textComment, avaliacao } = req.body
            const dadosAvaliacao = {
                COMENTARIO_AVALIACAO: textComment,
                NOTA_AVALIACAO: avaliacao,
                FICHAS_ID_OBRA: idFicha,
                USUARIOS_ID_USUARIO: req.session.autenticado.id
            }
            await fichasModel.comentarFicha(dadosAvaliacao)
            res.redirect(`/view-ficha?idFicha=${idFicha}`)
        } catch (error) {

        }
    }
}


module.exports = fichasControl