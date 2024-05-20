const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")
var bcrypt = require("bcryptjs")
var salt = bcrypt.genSaltSync(8)

const middleWares = {
    // Verifica se existe o item autenticado na variavel de sessão, se existir ela cria uma variavel e guarda o seu valor, ja se não, ela cria um objeto com os itens autenticado e id como null. dps disso define a propria variavel de sessão como a variavel criada e passa para o proximo middleWare
    verifyAutenticado: (req, res, next) => {
        if (req.session.autenticado) {
            var aut = req.session.autenticado
        } else {
            var aut = { autenticado: null, id: null }
        }
        req.session.autenticado = aut
        next();
    },
    // Destroi a variavel de sessão
    clearSession: (req, res, next) => {
        req.session.destroy();
        next()
    },
    // verifica se o item 'autenticado' da variavel de sessão 'autenticado' é diferente de null, se for ele passa pro proximo middleWare, senao ele realiza um res.render para a pagina passada como destinoFalha
    verifyAutorizado: (destinoFalha, objetoResRender = null) => {
        return (req, res, next) => {
            if (req.session.autenticado.autenticado != null) {
                next();
            } else {
                res.render(destinoFalha, objetoResRender)
            }
        };
    },
    // ele verifica se tem erros nos inputs da pagina, se tiver ele retorna o objeto como null, senao ele prossegue, buscando um usuario que tenha o nome digitado no formulario no campo name='usuario'. Caso tiver apenas 1 usuário, ele compara o hash da senha do input name="senha" com o hash da senha do banco de dados, caso for diferente de 1, ele retorna também tudo como null
    gravarAutenticacao: async (req, res, next) => {
        errors = validationResult(req)
        if (errors.isEmpty()) {
            var userBd = await usuariosModel.findByNickname(req.body.usuario)
            if (Object.keys(userBd).length == 1) {
                if (bcrypt.compareSync(req.body.senha, userBd[0].SENHA_USUARIO)) {
                    var aut = { autenticado: userBd[0].NICKNAME_USUARIO, id: userBd[0].ID_USUARIO }
                }
            } else {
                var aut = { autenticado: null, id: null }
            }
        } else {
            var aut = { autenticado: null, id: null }
        }
        req.session.autenticado = aut
        next();
    },
    
}

module.exports = middleWares