var pool = require("../../config/poolConn");
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
            const [resultado] = await pool.query("SELECT count(*) FROM VIDEOS WHERE USUARIOS_ID_USUARIO = ? AND STATUS_VIDEO = 'ativo'", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorId: async (idVideo) => {
        try {
            const [resultado] = await pool.query("SELECT * FROM VIDEOS WHERE ID_VIDEOS = ? AND STATUS_VIDEO = 'ativo'", [idVideo])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorIdUser: async (idUser) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM VIDEOS WHERE USUARIOS_ID_USUARIO = ? AND STATUS_VIDEO = 'ativo'", [idUser])
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    updateVideo: async (dadosAtualizados, idVideo) => {
        try {
        const [resultados] = await pool.query("UPDATE VIDEOS SET ? WHERE ID_VIDEOS = ? ", [dadosAtualizados, idVideo])
        return resultados
        } catch (error) {
            console.log("ERRO ao atualizar o VIDEO")
            console.log(error)
            return error
        }
    },
    acharPorTermo:async (termo)=>{
        try {
            const [resultados] = await pool.query("select * from VIDEOS where NOME_VIDEO LIKE ? AND STATUS_VIDEO = 'ativo' OR HASHTAG_VIDEO LIKE ? AND STATUS_VIDEO = 'ativo' OR DESCR_VIDEO LIKE ? AND STATUS_VIDEO = 'ativo'", [termo, termo, termo]);
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
    verificarCurtida: async (idVideo, idUsuario) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_VIDEOS WHERE VIDEOS_ID_VIDEOS = ? AND USUARIOS_ID_USUARIO = ? ", [idVideo, idUsuario])
            if (resultados[0].total > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDA DO VIDEO -----------")
            console.log(error)
            return error
        }
    },
    verificarCurtidasDoVideo: async (idVideo) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_VIDEOS WHERE VIDEOS_ID_VIDEOS = ?", [idVideo])
            return resultados[0].total
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDAS DO VIDEO  -----------")
            console.log(error)
            return error
        }
    },
    curtirVideo: async (dadosCurtida) => {
        try {
            const [resultados] = await pool.query("INSERT INTO FAVORITO_VIDEOS SET ?", [dadosCurtida]);
            return resultados;
        } catch (error) {
            console.error("Erro ao curtir", error);
            throw error;
        }
    },
    removerCurtidaVideo: async (idPost, idUser) => {
        try {
            const [resultados] = await pool.query("DELETE FROM FAVORITO_VIDEOS WHERE VIDEOS_ID_VIDEOS = ? AND USUARIOS_ID_USUARIO = ? ", [idPost, idUser]);
            return resultados;
        } catch (error) {
            console.error("Erro ao remover curtida", error);
            throw error;
        }
    },
    findVideosByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM VIDEOS WHERE ID_VIDEOS IN (?)", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
}

module.exports = videosModel;
