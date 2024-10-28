const { body, validationResult } = require("express-validator");
const resenhaModel = require("../models/resenhasModel");
const usuariosModel = require("../models/usuariosModel");
const anunciosModel = require("../models/anunciosModel");
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
        tipoUsu: req.session.autenticado ? req.session.autenticado.tipo : null,
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
          STATUS_RESENHA: 'ativo'
        }
        const resultado = await resenhaModel.criar(resenha)
        console.log(resultado)
        res.redirect(`/view-resenha?idResenha=${resultado.insertId}`)
      } catch (error) {
        console.log(error)
        if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
        req.session.token = { msg: "Erro ao postar resenha!", type: "danger", contagem: 0 }
        res.redirect("/error-404")
      }


    }
  },
  mostrarResenha: async (req, res) => {
    const idResenha = req.query.idResenha
    if (!idResenha) {
      req.session.token = { msg: "Erro ao encontrar resenha!", type: "danger", contagem: 0 }
      res.redirect("/error-404")
    } else {
      try {
        const resenha = await resenhaModel.buscarPorId(idResenha)
        if (resenha) {
          const autor = await usuariosModel.findUserById(resenha.USUARIOS_ID_USUARIO)
          if (autor) {
            const comentarios = await resenhaModel.findComentariosByIdResenha(resenha.ID_RESENHAS)
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

            const isCurtido = req.session.autenticado && req.session.autenticado.id != null
              ? await resenhaModel.verificarCurtida(idResenha, req.session.autenticado.id)
              : false

            const curtidas = await resenhaModel.verificarCurtidasDaResenha(idResenha)
            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
              req.session.token.contagem++;
            } else {
              req.session.token = null;
            }


            let anuncio = null

            if (!req.session.autenticado || req.session.autenticado.tipo == null || req.session.autenticado.tipo == 1) {
              let result = await anunciosModel.findAnuncioAleatorio()
              if (result.length > 0) {
                anuncio = result[0]
              } else {
                return res.redirect("/error-500")
              }
            }

            const jsonResult = {
              page: "../partial/template-home/view-resenha",
              classePagina: "",
              resenha: {
                ...resenha,
                tags: resenha.HASHTAG_RESENHA.split(","),
                autor: autor[0],
                curtidas: curtidas
              },
              comentarios: comments,
              foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
              token: token,
              isCurtido: isCurtido,
              tipoUsu: req.session.autenticado ? req.session.autenticado.tipo : null,
              anuncio: anuncio
            }

            res.render("./pages/template-home", jsonResult)
          } else {
            res.redirect("/error-404")
          }
        } else {

          res.redirect("/error-404")
        }

      } catch (error) {
        console.log(error)
        req.session.token = { msg: "Erro ao mostrar resenha!", type: "danger", contagem: 0 }
        res.redirect("/error-500")

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
      let idResenha = req.query.idResenha
      if (!idResenha) {
        req.session.token = { msg: "Erro ao encontrar resenha!", type: "danger", contagem: 0 }
        return res.redirect("/error-404")
      } else {
        let resenha = await resenhaModel.buscarPorId(idResenha);
        if (resenha.USUARIOS_ID_USUARIO != req.session.autenticado.id) {
          return res.redirect("/");
        }
        const token = null;
        const jsonResult = {
          foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
          page: "../partial/template-home/pub-pages/resenhas-att",
          classePagina: "publicar",
          erros: listaErros,
          token: token,
          valores: {
            titulo: resenha.TITULO_RESENHA,
            textoResenha: resenha.TEXTO_RESENHA,
            descricao: resenha.DESCR_RESENHA,
            capaResenha: resenha.CAPA_CAMINHO,
            idResenha: resenha.ID_RESENHAS
          },
          tipoUsu: req.session.autenticado ? req.session.autenticado.tipo : null,
          tags: resenha.HASHTAG_RESENHA.split(","),
        };
        res.render("./pages/template-home", jsonResult)
      }
    } else {
      try {
        let idResenha = req.query.idResenha
        if (!idResenha) {
          req.session.token = { msg: "Erro ao encontrar resenha!", type: "danger", contagem: 0 }
          return res.redirect("/error-404")
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
        console.log("ATT-RESENHA--------------------------")
        const resultado = await resenhaModel.updateResenha(idResenha, resenha)
        console.log(resultado)
        res.redirect(`/view-resenha?idResenha=${idResenha}`)
      } catch (error) {
        console.log(error)
        if (req.file) { removeImg(`./app/public/img/imagens-servidor/capaImg/${req.file.filename}`) }
        req.session.token = { msg: "Erro ao atualizar resenha!", type: "danger", contagem: 0 }
        res.redirect("/error-500")
      }


    }
  },
  avaliarResenha: async (req, res) => {
    try {
      const idResenha = req.query.idResenha
      if (!idResenha) {
        req.session.token = { msg: "Erro ao encontrar resenha!", type: "danger", contagem: 0 }
        return res.redirect("/error-500")
      }
      const { textComment, avaliacao } = req.body
      const dadosAvaliacao = {
        COMENTARIO_AVALIACAO: textComment,
        NOTA_AVALIACAO: avaliacao,
        RESENHAS_ID_RESENHAS: idResenha,
        USUARIOS_ID_USUARIO: req.session.autenticado.id
      }
      await resenhaModel.comentarResenha(dadosAvaliacao)
      res.redirect(`/view-resenha?idResenha=${idResenha}`)
    } catch (error) {
      console.log(error)
      req.session.token = { msg: "Erro ao avaliar a resenha!", type: "danger", contagem: 0 }
      res.redirect("/error-500")
    }
  }
}

module.exports = resenhaControl