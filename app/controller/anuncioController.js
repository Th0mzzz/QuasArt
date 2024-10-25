const { body, validationResult } = require("express-validator");
const usuariosModel = require("../models/usuariosModel");
const { removeImg } = require("../util/removeImg");
const anunciosModel = require("../models/anunciosModel");
const adminModel = require("../models/adminModel");

const anunciosController = {
    validacaoAnuncio: [
        body("nomePat")
            .isLength({ min: 3, max: 45 }).withMessage("O Nome deve ter no minimo 3 caracteres e no máximo 45!")
        ,
        body("linkAnuncio")
            .isLength({ min: 15, max: 1500 }).withMessage("O link deve ter entre 15 e 1500 caracteres!")
    ],
    criarAnuncio: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;
        console.log()
        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/anuncios/foto-patrocinador/${req.files['fotoPat'][0].filename}`)
                    removeImg(`./app/public/img/imagens-servidor/anuncios/anuncio-imagem/${req.files['anuncioImg'][0].filename}`)
                }
            }

            console.log(listaErros)
            const anuncios = await adminModel.findAllAnuncios()
            const jsonResult = {
                page: "../partial/adm/anuncios",
                token: null,
                classePagina: "anuncios",
                anuncios: anuncios.length >= 1 ? anuncios : null,
                modal: { seeAnuncio: "", criarAnuncio: "show", attAnuncio: "" },
                anuncio: null,
                erros: listaErros,
            }
            res.render("pages/template-adm", jsonResult)

        } else {
            try {
                const fotoPat = req.files['fotoPat'] ? req.files['fotoPat'][0] : null;
                const anuncioImg = req.files['anuncioImg'] ? req.files['anuncioImg'][0] : null;
                const { nomePat, linkAnuncio } = req.body
                const anuncio = {
                    NOME_PATROCINADOR: nomePat,
                    LINK_ANUNCIO: linkAnuncio != "" ? linkAnuncio : null,
                    CAMINHO_FOTO_PATROCINADOR: fotoPat.filename,
                    CAMINHO_IMAGEM_ANUNCIO: anuncioImg.filename,
                    STATUS_ANUNCIO: "ativo"
                }
                const resultado = await anunciosModel.createAnuncio(anuncio)
                console.log(resultado)
                req.session.token = { msg: "Anúncio criado com sucesso", type: "success", contagem: 0 }
                res.redirect('/adm-anuncios')
            } catch (error) {
                console.log(error)
                if (req.files) {
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['fotoPat'][0].filename}`)
                    removeImg(`./app/public/img/imagens-servidor/capaImg/${req.files['anuncioImg'][0].filename}`)
                }
                req.session.token = { msg: "Erro ao criar anúncio", type: "danger", contagem: 0 }
                res.redirect("/error-500")
            }


        }
    },
    attAnuncio: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter;
        console.log()
        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
            }
            console.log(listaErros)
            try {
                const anuncios = await adminModel.findAllAnuncios()
                const idAnuncio = req.query.idAnuncio
                if (!idAnuncio) {
                    req.session.token = { msg: "Erro ao encontrar anúncio", type: "danger", contagem: 0 }
                    return res.redirect("/adm-anuncios")
                }
                const anuncio = await anunciosModel.findAnuncioById(idAnuncio)
                const jsonResult = {
                    page: "../partial/adm/anuncios",
                    token: null,
                    classePagina: "anuncios",
                    anuncios: anuncios.length >= 1 ? anuncios : null,
                    modal: { seeAnuncio: "", criarAnuncio: "", attAnuncio: "show" },
                    anuncio: anuncio,
                    erros: listaErros,
                }
                res.render("pages/template-adm", jsonResult)
            } catch (error) {
                console.log(error)
                res.redirect("/error-500")
            }
        } else {
            try {

                const idAnuncio = req.query.idAnuncio
                const anuncio = await anunciosModel.findAnuncioById(idAnuncio)

                if (!idAnuncio || !anuncio) {
                    req.session.token = { msg: "Erro ao encontrar anúncio", type: "danger", contagem: 0 }
                    return res.redirect("/adm-anuncios")
                }

                const fotoPat = req.files['fotoPat'] ? req.files['fotoPat'][0].filename : anuncio.CAMINHO_FOTO_PATROCINADOR;
                const anuncioImg = req.files['anuncioImg'] ? req.files['anuncioImg'][0].filename : anuncio.CAMINHO_IMAGEM_ANUNCIO;

                if(req.files){
                    if(req.files['fotoPat']) removeImg(`./img/imagens-servidor/anuncios/foto-patrocinador/${anuncio.CAMINHO_FOTO_PATROCINADOR}`)
                    if(req.files['anuncioImg']) removeImg(`./img/imagens-servidor/anuncios/foto-patrocinador/${anuncio.CAMINHO_IMAGEM_ANUNCIO}`)
                }

                const { nomePat, linkAnuncio } = req.body
                const anuncioAtualizado = {
                    NOME_PATROCINADOR: nomePat,
                    LINK_ANUNCIO: linkAnuncio != "" ? linkAnuncio : null,
                    CAMINHO_FOTO_PATROCINADOR: fotoPat,
                    CAMINHO_IMAGEM_ANUNCIO: anuncioImg,
                }
                const resultado = await anunciosModel.updateAnuncio(idAnuncio, anuncioAtualizado)
                console.log(resultado)
                req.session.token = { msg: "Anúncio atualizado com sucesso", type: "success", contagem: 0 }
                res.redirect('/adm-anuncios')
            } catch (error) {
                console.log(error)
                req.session.token = { msg: "Erro ao criar anúncio", type: "danger", contagem: 0 }
                res.redirect("/error-500")
            }


        }
    },

}

module.exports = anunciosController