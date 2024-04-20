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
            const [resultados] = await pool.query("select * from USUARIOS where NICKNAME_USUARIO = ?",[nickname])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    },
    findEmail: async (email) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where EMAIL_USUARIO = ?",[email])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findCpf: async (cpf) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CPF_USUARIO = ?",[cpf])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findPasswordByUser: async (usuario,senha)=>{
        try {
            const [resultados] = await pool.query("select * from USUARIOS where NICKNAME_USUARIO = ? AND SENHA_USUARIO = ? LIMIT 1 ", [usuario,senha])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    }
}

module.exports = usuariosModel;