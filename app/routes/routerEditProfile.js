var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosModel = require("../models/usuariosModel");
const usuariosController = require("../controller/usuariosController");
const { findUserById } = require("../models/usuariosModel");
const { body } = require("express-validator")
// UTIL --------------- 
const upload = require("../util/upload");
const uploadPerfil = upload("./app/public/img/imagens-servidor/perfil/", 3, ['jpeg', 'jpg', 'png', 'webp']);
const jwt = require("jsonwebtoken")
const { enviarEmail, enviarEmailAtivacao } = require("../util/sendEmail")

const dotenv = require("dotenv");
dotenv.config();
// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: "",  
    token:null,
}

router.get("/edit-profile",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        try {
            const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
            const jsonResult = {
                page: "../partial/edit-profile/index",
                pageClass: "index",
                usuario: user[0],
                modalAberto: false,
                erros: null,
                token: null
            }
            res.render("./pages/edit-profile", jsonResult)
        } catch (error) {
            console.log(error)
            res.status(500).render("pages/error-500.ejs");

        }
    });
router.get("/security",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        try {
            const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
            const jsonResult = {
                page: "../partial/edit-profile/security",
                pageClass: "security",
                usuario: user[0],
                token: null,
                erros: null,
                modalAberto: false
            }
            res.render("./pages/edit-profile", jsonResult)
        } catch (error) {
            console.log(error)
            res.status(500).render("pages/error-500.ejs");

        }
    });
router.get("/dados-pessoais",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("./pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        try {
            const user = req.session.autenticado ? await findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
            const data = new Date(user[0].DATA_NASC_USUARIO)
            const dataFormatada = data.toISOString().split('T')[0];
            const jsonResult = {
                page: "../partial/edit-profile/dados-pessoais",
                pageClass: "dadosPessoais",
                usuario: user[0],
                erros: null,
                valores: {
                    nome: user[0].NOME_USUARIO,
                    nascimento: dataFormatada,
                    cpf: user[0].CPF_USUARIO,
                    contato: user[0].CONTATO,
                    usuario: user[0].NICKNAME_USUARIO,
                },
                token: null
            }
            res.render("./pages/edit-profile", jsonResult)
        } catch (error) {
            console.log(error)
            res.status(500).render("pages/error-500.ejs");

        }
    }
)







// ---------------------------POSTS-----------------
router.post("/mudarFoto",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadPerfil("imgPerfil"),
    function (req, res) {
        usuariosController.mudarFoto(req, res)
    })
router.post("/atualizarDados",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    usuariosController.regrasValidacaoAtualizarConta,
    function (req, res) {
        usuariosController.atualizarUsuario(req, res)
    })
router.post("/atualizarSenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    body('senha')
        .isLength({ min: 8, max: 30 })
        .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
        .bail()
        .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
        .bail()
        .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
        .bail()
        .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número inteiro.')
        .bail()
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
        .bail(),
    async function (req, res) {
        usuariosController.attSenha(req, res);
    })

router.post("/excluirConta",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    body('senha')
        .isLength({ min: 8, max: 30 })
        .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
        .bail()
        .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
        .bail()
        .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
        .bail()
        .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número inteiro.')
        .bail()
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
        .bail(),
    async function (req, res) {
        usuariosController.inativarConta(req, res)
    })
router.post("/excluirFoto",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        usuariosController.excluirFoto(req, res)
    })

module.exports = router;