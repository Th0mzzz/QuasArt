var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS e MODELS\-------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const usuariosModel = require("../models/usuariosModel");
// UTIL --------------- 
const { body, validationResult } = require("express-validator");


// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: "",
    token: null,
}

// ---------------------------------------- GETS -------------------------------------------------- 



// -------- PÁGINAS DE VISUALIZAÇÃO -------------


router.get("/ativar-conta",
    middleWares.verifyAutenticado,
    async function (req, res) {
        usuariosController.ativarConta(req, res);
    }
)
// ------------ LOGIN E CADASTRO ---------------

router.get("/entrar", function (req, res) {

    if (req.session.autenticado && req.session.autenticado.autenticado && req.session.autenticado.autenticado != null) {
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/inicial-home",
            classePagina: "inicialHome",
            token: {
                msg: `Bom te ver de novo`,
                usuario: `${req.session.autenticado.autenticado}!`
            }
        }
        res.render("pages/template-home", jsonResult)

    } else {
        let alert = req.session.token ? req.session.token : null;
        if (alert && alert.contagem < 1) {
            req.session.token.contagem++;
        } else {
            req.session.token = null;
        }
        res.render("pages/template-login", {
            page: "../partial/template-login/login",
            modal: "fechado",
            erros: null,
            valores: "",
            incorreto: "",
            token: alert
        });
    }
});
//  pagina de cadastro
router.get("/cadastrar", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/cadastro",
        modal: "fechado",
        erros: null,
        valores: "",
        token: null
    }
    res.render("pages/template-login", jsonResult);
});
// pagina de esqueceu a senha
router.get("/esqueceuSenha", function (req, res) {
    let alert = req.session.token ? req.session.token : null;
    if (alert && alert.contagem < 1) {
        req.session.token.contagem++;
    } else {
        req.session.token = null;
    }
    const jsonResult = {
        page: "../partial/template-login/esqueceuSenha",
        modal: "fechado",
        erros: null,
        token: alert,
        modalAberto: false
    }
    res.render("pages/template-login", jsonResult);
});


router.get("/solicitarResetSenha",
    [
        body('email')
            .isEmail().withMessage('Deve ser um email válido')
            .bail()
            .custom(async (email) => {
                const emailExistente = await usuariosModel.findUserByEmail(email)
                if (emailExistente.length > 0) {
                    throw new Error("E-mail já em uso! Tente outro");
                }
                return true;
            })],
    async function (req, res) {

        let error = validationResult(req)

        if (!error.isEmpty) {
            let alert = req.session.token ? req.session.token : null;
            if (alert && alert.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            const jsonResult = {
                page: "../partial/template-login/esqueceuSenha",
                modal: "fechado",
                erros: error,
                token: alert,
                modalAberto: false
            }
            res.render("pages/template-login", jsonResult);
        } else {
            try {
                const { email } = req.body
                const user = await usuariosModel.findUserByEmail(email)

                const token = jwt.sign(
                    {
                        userId: user[0].ID_USUARIO,
                        expiresIn: "40m"
                    },
                    process.env.SECRET_KEY
                )
                const resetSenhaEmailDocument = require("../util/emails/recuperarSenha")(process.env.URL_BASE, token);
                enviarEmail(
                    user[0].EMAIL_USUARIO,
                    "Recuperar de senha",
                    resetSenhaEmailDocument,
                    async () => {
                        req.session.token = { msg: "E-mail enviado com sucesso", type: "success", contagem: 0 }
                        res.redirect("/esqueceuSenha")
                    })


            } catch (error) {
                console.log(error)
                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });

            }
        }

    });

router.get("/redefinir-senha",
    function (req, res) {
        usuariosController.verificarTokenRedefinirSenha(req, res)
    });
// Link para destruir sessão
router.get("/sair", middleWares.clearSession, function (req, res) {
    res.redirect("/")
})

// --------------------------------- POSTS --------------------------------- //


// Router do FORM de cadastro que chama o Controle de Usuários e cadastra o usuário  

router.post("/criarConta", usuariosController.regrasValidacaoCriarConta, function (req, res) {
    usuariosController.criarUsuario(req, res)
});

// Router do FORM de login que chama o controle de usuários e valida e verifica no banco se o usuário digitado existe
router.post("/logarConta", usuariosController.regrasValidacaoEntrar, middleWares.gravarAutenticacao, function (req, res) {
    usuariosController.entrar(req, res)
})


//Redefinição de senha




module.exports = router;