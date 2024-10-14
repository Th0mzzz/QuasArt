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
}

module.exports = adminModel;