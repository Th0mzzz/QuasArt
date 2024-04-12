const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")

const usuariosController = {
    regrasValidacao: [
        body("nome").isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras! "),
        body("nascimento").isDate().isBefore('01/01/2011').withMessage('Necessário ter mais de 13 anos!'),
        body('email').isEmail().withMessage('Deve ser um email válido'),
        body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
    ],
    criarUsuario: async (req, res) => {
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
        const resultados = await usuariosModel.create(dadosForm);
        console.log(resultados);
    }
}

module.exports = usuariosController