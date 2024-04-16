const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")

const usuariosController = {
    regrasValidacao: [
        body("nome").isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras!"),
        body("nascimento").isDate().withMessage('Data de nascimento inválida').isBefore('01/01/2009').withMessage('Necessário ter mais de 13 anos!'),
        body("cpf").isLength({ min: 11, max: 11 }).withMessage("CPF deve ter 11 dígitos").isNumeric().withMessage("CPF deve conter apenas números"),
        body("contato").isMobilePhone('pt-BR').withMessage("Número de telefone inválido"),
        body('usuario').isLength({ min: 5 }).withMessage("Usuário deve ter pelo menos 5 caracteres"),
        body('email').isEmail().withMessage('Deve ser um email válido'),
        body('senha').isLength({ min: 8, max: 30 }).withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
    ],
    criarUsuario: async (req, res) => {
        let errors = validationResult(req)
        console.log(errors)

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