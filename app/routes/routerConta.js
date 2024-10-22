var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
// UTIL --------------- 
const upload = require("../util/upload");
const uploadCapa = upload("./app/public/img/imagens-servidor/capas-img/", 5, ['jpeg', 'jpg', 'png']);


// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
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
        valores: ""
    }
    res.render("pages/template-login", jsonResult);
});
// pagina de esqueceu a senha
router.get("/esqueceuSenha", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/esqueceuSenha",
        modal: "fechado",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
});
// formulario para enviar email
router.get("/enviarEmail", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/esqueceuSenha",
        modal: "aberto",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
})
// Link para destruir sessão
router.get("/sair", middleWares.clearSession, function (req, res) {
    res.redirect("/")
})

// --------------------------------- POSTS --------------------------------- //

// form para checar se o valor do token é correto
router.post("/checarToken", function (req, res) {
    const jsonResult = {
        page: "../partial/template-login/redefinir",
        modal: "fechado",
        erros: null
    }
    res.render("pages/template-login", jsonResult);
})
// Router do FORM de cadastro que chama o Controle de Usuários e cadastra o usuário  

router.post("/criarConta", usuariosController.regrasValidacaoCriarConta, function (req, res) {
    usuariosController.criarUsuario(req, res)
});

// Router do FORM de login que chama o controle de usuários e valida e verifica no banco se o usuário digitado existe
router.post("/logarConta", usuariosController.regrasValidacaoEntrar, middleWares.gravarAutenticacao, function (req, res) {
    usuariosController.entrar(req, res)
})


module.exports = router;