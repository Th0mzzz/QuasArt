var pool = require("../../config/poolConn");

const adminModel = {
    findAllUsers: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM USUARIOS LIMIT 1000");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
    findDenuncias: async (table) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM ?? LIMIT 1000", [table]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar denuncias de fichas", error);
            throw error;
        }
    },
    updateDenuncia: async (tableDenuncia, denuncia, idDenuncia) => {
        try {
            const [resultados] = await pool.query("UPDATE ?? SET ? WHERE ID_DENUNCIA = ? ", [tableDenuncia, denuncia, idDenuncia])
            return resultados

        } catch (error) {
            console.error("Erro ao atualizar usuário", error);
            throw error;
        }
    },
    verifyStatusDenuncia: async (tableDenuncia, idDenuncia) => {
        try {
            const [resultados] = await pool.query("SELECT STATUS_DENUNCIA AS status FROM ?? WHERE ID_DENUNCIA = ? ", [tableDenuncia, idDenuncia]);
            if (resultados[0].status == 'concluida') {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.error("Erro ao verificar status da denuncia", error);
            throw error;
        }
    },
    denunciar: async (denuncia,table) => {
        try {
            const [resultados] = await pool.query("insert into ?? set ?", [table,denuncia])
            return resultados
        } catch (error) {
            console.log('Erro ao denunciar usuário')
            console.log(error)
            throw error
        }
    },
}

module.exports = adminModel;