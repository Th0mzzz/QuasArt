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
    findDenunciasUsuarios: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM DENUNCIAS_USUARIOS LIMIT 1000");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar denuncias de usuarios", error);
            throw error;
        }
    },
    findDenunciasResenhas: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM DENUNCIAS_RESENHAS LIMIT 1000");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar denuncias de resenhas", error);
            throw error;
        }
    },
    findDenunciasVideos: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM DENUNCIAS_VIDEOS LIMIT 1000");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar denuncias de videos", error);
            throw error;
        }
    },
    findDenunciasFichas: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM DENUNCIAS_FICHAS LIMIT 1000");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar denuncias de fichas", error);
            throw error;
        }
    }
}

module.exports = adminModel;