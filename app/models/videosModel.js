var pool = require("../../config/poolConn");
const { updateFicha } = require("./fichasModel");
const videosModel = {
    create: async (dadosVideo) => {
        try {
            const [resultados] = await pool.query("insert into VIDEOS set ?", [dadosVideo])
            return resultados
        } catch (error) {
            return error
        }
    },
    contarVideosPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT count(*) FROM VIDEOS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorId: async (idVideo) => {
        try {
            const [resultado] = await pool.query("SELECT * FROM VIDEOS WHERE ID_VIDEOS = ?", [idVideo])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorIdUser: async (idUser) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM VIDEOS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    updateVideo: async (dadosAtualizados, idVideo) => {
        try {
        const [resultados] = await pool.query("UPDATE VIDEOS SET ? WHERE ID_VIDEOS = ?", [dadosAtualizados, idVideo])
        return resultados
        } catch (error) {
            console.log("ERRO ao atualizar o VIDEO")
            console.log(error)
            return error
        }
    },
    acharPorTermo:async (termo)=>{
        try {
            const [resultados] = await pool.query("select * from VIDEOS where NOME_VIDEO LIKE ? OR HASHTAG_VIDEO LIKE ? OR DESCR_VIDEO LIKE ?", [termo, termo, termo]);
            return resultados;
        } catch (error) {
            console.log("Erro ao buscar videos");
            return error;
        }
    },
    comentarVideo: async (dadosAvaliacao) => {
        try {
            const [resultados] = await pool.query("insert into AVALIACAO_VIDEO set ?", [dadosAvaliacao])
            return resultados
        } catch (error) {
            console.log("----------- ERRO AO COMENTAR NO VIDEO -----------")
            return error
        }
    },
    findComentariosByIdVideo: async (idVideo) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM AVALIACAO_VIDEO WHERE VIDEOS_ID_VIDEOS = ?", [idVideo])
            return resultados
        } catch (error) {
            console.log("----------- ERRO AO ACHAR COMENTARIOS DO VIDEO -----------")
            console.log(error)
            return error
        }
    },
}

module.exports = videosModel;
