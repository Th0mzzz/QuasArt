var pool = require("../../config/poolConn");

const usuariosModel = {
    createUser: async (dadosForm) => {
        try {
            const [resultados] = await pool.query("insert into USUARIOS set ?", [dadosForm])
            return resultados
        } catch (error) {
            throw error
        }
    },
    findUserByContato: async (contato) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CONTATO = ? AND STATUS_USUARIO = 'ativo' ", [contato])
            return resultados
        } catch (error) {
            throw error
        }
    },
    findUserByNickname: async (nickname) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where NICKNAME_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [nickname])
            return resultados

        } catch (error) {
            console.log("Erro ao buscar usuário", error);
            throw error;
        }
    },
    findUserByEmail: async (email) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where EMAIL_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [email])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findUserByCpf: async (cpf) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CPF_USUARIO = ? AND STATUS_USUARIO = 'ativo' ", [cpf])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findPasswordByUser: async (usuario) => {
        try {
            const [resultados] = await pool.query("SELECT SENHA_USUARIO FROM USUARIOS WHERE NICKNAME_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [usuario])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    },
    findUserById: async (id) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID_USUARIO = ? AND STATUS_USUARIO = 'ativo' LIMIT 1", [id])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    },
    updateUser: async (dadosForm, id) => {
        try {
            const [resultados] = await pool.query("UPDATE USUARIOS SET ? WHERE ID_USUARIO = ? ", [dadosForm, id])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao atualizar usuário", error);
            throw error;
        }
    },
    findUsersByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID_USUARIO IN (?) AND STATUS_USUARIO = 'ativo'", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },

}

module.exports = usuariosModel;