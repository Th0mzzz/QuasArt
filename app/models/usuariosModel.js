var pool = require("../../config/poolConn");

const usuariosModel = {
    create: async (dadosForm) => {
        try {
            const [resultados] = await pool.query("insert into USUARIOS set ?", [dadosForm])
            return resultados
        } catch (error) {
            return error
        }
    },
    findContato: async (contato) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CONTATO = ?", [contato])
            return resultados
        } catch (error) {
            return error
        }
    },
    findNickname: async (nickname) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where NICKNAME_USUARIO = ?"[nickname])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    }
}

module.exports = usuariosModel;