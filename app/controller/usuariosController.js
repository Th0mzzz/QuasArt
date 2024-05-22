const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")
const moment = require("moment")
var bcrypt = require("bcryptjs")
var salt = bcrypt.genSaltSync(8)

const usuariosController = {

    // Validação do form de cadastro
    regrasValidacaoCriarConta: [
        // verifica nome tamanho max e min
        body("nome")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras!"),
        // verifica se a idade é valida, e dps se define a idade minima que é a data atual menos 13 anos. Depois verifica se a dataNascimento é depois da dataminima, se for, ele cancela e retorna o erro dizendo que é necessario ter mais de 13 anos
        body('nascimento')
            .custom(value => {
                const dataNascimento = moment(value, "YYYY-MM-DD");
                const dataMinima = moment().subtract(13, 'years');
                if (dataNascimento.isAfter(dataMinima)) {
                    throw new Error("Necessário ser maior de 13 anos!");
                }
                return true;
            }),
        // verifica se o cpf é valido e se tem 11 digitos, dps verifica se já existe o cpf no banco de dados, se existir ele retorna q o cpf ja está em uso
        body("cpf")
            .isLength({ min: 11, max: 11 }).withMessage("CPF deve ter 11 dígitos")
            .isNumeric().withMessage("CPF deve conter apenas números")
            .bail()
            .custom(async (cpf) => {
                const cpfExistente = await usuariosModel.findCpf(cpf)
                if (cpfExistente.length > 0) {
                    throw new Error("CPF já em uso! Tente outro");
                }
                return true;
            }),
        //  verifica se o telefone é valido e faz o mesmo caso do cpf, so que para numero
        body("contato")
            .isMobilePhone('pt-BR').withMessage("Número de telefone inválido")
            .bail()
            .custom(async (contato) => {
                const contatoExistente = await usuariosModel.findContato(contato)
                if (contatoExistente.length > 0) {
                    throw new Error("Telefone já em uso! Tente outro");
                }
                return true;
            }),
        // verifica se o usuário tem 4 caracteres e se o usuário digitado existe no banco de dados, caso tenha, retorna como incorreto

        body('usuario')
            .isLength({ min: 4 }).withMessage("Usuário deve ter pelo menos 4 caracteres!")
            .bail()
            .custom(async (usuario) => {
                const usuarioExistente = await usuariosModel.findByNickname(usuario)
                if (usuarioExistente[0] === usuario) {
                    throw new Error("Usuário já existe! Tente outro");
                }
                return true;
            }),
        // mesma coisa do telefone so que para email
        body('email')
            .isEmail().withMessage('Deve ser um email válido')
            .bail()
            .custom(async (email) => {
                const emailExistente = await usuariosModel.findEmail(email)
                if (emailExistente.length > 0) {
                    throw new Error("E-mail já em uso! Tente outro");
                }
                return true;
            }),
        // verifica se a senha tem o tamanho minimo de 8 e no max 30 digitos
        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    regrasValidacaoEntrar: [

        body('usuario').isLength({ min: 4, max: 30 }).withMessage("Usuário deve ter pelo menos 4 caracteres!"),

        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    criarUsuario: async (req, res) => {
        let errors = validationResult(req)
        console.log(req.session.autenticado)
        if (!errors.isEmpty()) {
            console.log(errors)
            res.render("pages/template-login", { page: "../partial/template-login/cadastro", modal: "fechado", erros: errors, valores: req.body });
        } else {
            const { nome, nascimento, cpf, contato, usuario, email, senha } = req.body
            let hashSenha = bcrypt.hashSync(senha, salt);
            dadosForm = {
                NOME_USUARIO: nome,
                NICKNAME_USUARIO: usuario,
                CONTATO: contato,
                SENHA_USUARIO: hashSenha,
                DATA_NASC_USUARIO: nascimento,
                CPF_USUARIO: cpf,
                EMAIL_USUARIO: email
            }
            try {
                const resultados = await usuariosModel.create(dadosForm);
                console.log(resultados);
                res.render("pages/template-home", { page: "../partial/template-home/inicial-home", classePagina: "initial-home", tokenAlert: { msg: `Seja bem-vindo ao QuasArt, `, usuario: `${usuario}!` } })
                console.log("Cadastrado!")
            } catch (erros) {
                console.log(erros)
                res.render("pages/error-500")
            }

        }
    },
    entrar: async (req, res) => {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: errors, incorreto: null });
        } else {

            const { usuario, senha } = req.body
            try {
                const userBd = await usuariosModel.findByNickname(usuario)
                if (userBd && bcrypt.compareSync(senha, userBd[0].SENHA_USUARIO) && req.session.autenticado.autenticado) {
                    res.render("pages/template-home", { page: "../partial/template-home/inicial-home", classePagina: "inicialHome", tokenAlert: { msg: `Bom te ver de novo`, usuario: `${usuario}!` } })
                    console.log("Logado!")
                } else {
                    res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: null, incorreto: "ativado" });
                }

            } catch (erros) {
                console.log(erros)
                res.render("pages/error-500")
            }

        }
    },
    mostrarPageProfile: (req, res) => {

    }

}

module.exports = usuariosController