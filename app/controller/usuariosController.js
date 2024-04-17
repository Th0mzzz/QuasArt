const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")
const moment = require("moment")

const usuariosController = {
    regrasValidacao: [
        body("nome").isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras!"),

        body('nascimento').custom(value => {
            const dataNascimento = moment(value, "YYYY-MM-DD");
            const dataMinima = moment().subtract(13, 'years');
            if (dataNascimento.isAfter(dataMinima)) {
                throw new Error("Necessário ser maior de 13 anos!");
            }
            return true;
        }),

        body("cpf").isLength({ min: 11, max: 11 }).withMessage("CPF deve ter 11 dígitos").isNumeric().withMessage("CPF deve conter apenas números").bail().custom(async (cpf) => {
            const cpfExistente = await usuariosModel.findCpf(cpf)
            if (cpfExistente.length > 0) {
                throw new Error("CPF já em uso! Tente outro");
            }
            return true;
        }),

        body("contato").isMobilePhone('pt-BR').withMessage("Número de telefone inválido").bail().custom(async (contato) => {
            const contatoExistente = await usuariosModel.findContato(contato)
            if (contatoExistente.length > 0) {
                throw new Error("Contato já em uso! Tente outro");
            }
            return true;
        }),

        body('usuario').isLength({ min: 4 }).withMessage("Usuário deve ter pelo menos 4 caracteres!").bail().custom(async (usuario) => {
            const usuarioExistente = await usuariosModel.findNickname(usuario)
            if (usuarioExistente.length > 0) {
                throw new Error("Usuário já existe! Tente outro");
            }
            return true;
        }),

        body('email').isEmail().withMessage('Deve ser um email válido').bail().custom(async (email) => {
            const emailExistente = await usuariosModel.findEmail(email)
            if (emailExistente.length > 0) {
                throw new Error("E-mail já em uso! Tente outro");
            }
            return true;
        }),
        
        body('senha').isLength({ min: 8, max: 30 }).withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
    ],
    criarUsuario: async (req, res) => {
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render("pages/template-login", { page: "../partial/template-login/cadastro", modal: "fechado", erros: errors });
        } else {
            const { nome, nascimento, cpf, contato, usuario, email, senha } = req.body
            dadosForm = {
                NOME_USUARIO: nome,
                NICKNAME_USUARIO: usuario,
                CONTATO: contato,
                SENHA_USUARIO: senha,
                DATA_NASC_USUARIO: nascimento,
                CPF_USUARIO: cpf,
                EMAIL_USUARIO: email
            }
            try {

                const resultados = await usuariosModel.create(dadosForm);
                console.log(resultados);
                res.redirect("/home")
            } catch (erros) {
                console.log(erros)
                res.render("pages/error-500")
            }

        }
    }
}

module.exports = usuariosController