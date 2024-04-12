var pool = require("../../config/poolConn");

const usuariosModel = {
    create: async (dadosForm) => {
        try {
            const [resultados] = await pool.query("insert into USUARIOS(`ID_USUARIO`,`NOME_USUARIO`,`NICKNAME_USUARIO`,`CONTATO`,`SENHA_USUARIO`,`DATA_NASC_USUARIO`, `CPF_USUARIO`,) values(?, ?)", [dadosForm.NOME_USUARIO, dados])
            return resultados
        } catch (error) {
            return error
        }
    }
}

module.exports = usuariosModel;