var pool = require("../../config/poolConn");
const anunciosModel = {
    createAnuncio: async (dadosAnuncio) => {
        try {
            const [resultados] = await pool.query("insert into ANUNCIOS set ?", [dadosAnuncio])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de Anuncio -----------")
            throw error
        }
    },
    findAnuncioById: async (idAnuncio) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM ANUNCIOS WHERE ID_ANUNCIO = ? AND STATUS_ANUNCIO = 'ativo'", [idAnuncio])
            return resultados[0]
        } catch (error) {
            console.log("----------- Erro no model de Anuncio -----------")
            console.log(error)
            return error
        }
    },
    updateAnuncio: async (idAnuncio, dadosAtualizados) => {
        try {
            const [resultados] = await pool.query("UPDATE ANUNCIOS SET ? WHERE ID_ANUNCIO = ?", [dadosAtualizados, idAnuncio]);
            return resultados;
        } catch (error) {
            console.log("Erro ao atualizar Anuncio");
            throw error;
        }
    },
    findAnunciosByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM ANUNCIOS WHERE ID_ANUNCIO IN (?) ", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
    findAnuncioAleatorio: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM ANUNCIOS WHERE STATUS_ANUNCIO = 'ativo' ORDER BY RAND() LIMIT 1;");
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },

}

module.exports = anunciosModel;
