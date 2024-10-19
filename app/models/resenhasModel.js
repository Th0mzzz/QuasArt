var pool = require("../../config/poolConn");

const resenhaModel = {
    criar: async (dadosResenha) => {
        try {
            const [resultados] = await pool.query("INSERT INTO RESENHAS SET ? ", [dadosResenha])
            return resultados
        } catch (error) {
            console.log(`Impossivel criar resenha`)
            return error
        }
    },
    buscarPorId: async (idResenha) => {
        try {
            const [resultado] = await pool.query("SELECT * FROM RESENHAS WHERE ID_RESENHAS = ? AND STATUS_RESENHA = 'ativo'", [idResenha])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorIdDeUser: async (idUser) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS WHERE USUARIOS_ID_USUARIO = ? ", [idUser])
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    contarResenhasPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT count(*) FROM RESENHAS WHERE USUARIOS_ID_USUARIO = ? AND STATUS_RESENHA = 'ativo'", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    findResenhasEmAlta: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS WHERE STATUS_RESENHA = 'ativo'")
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    findResenhasRecentes: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS WHERE STATUS_RESENHA = 'ativo' ORDER BY ID_RESENHAS DESC LIMIT 1000;")
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    updateResenha: async (idResenha, dadosAtualizados) => {
        try {
            const [resultados] = await pool.query("UPDATE RESENHAS SET ? WHERE ID_RESENHAS = ?", [dadosAtualizados, idResenha]);
            return resultados;
        } catch (error) {
            console.log("Erro ao atualizar Resenha");
            console.log(error);
            return error;
        }
    },
    acharPorTermo: async (termo) => {
        try {
            const [resultados] = await pool.query("select * from RESENHAS where TITULO_RESENHA LIKE ? OR DESCR_RESENHA LIKE ? OR HASHTAG_RESENHA LIKE ? OR TEXTO_RESENHA LIKE ? AND STATUS_RESENHA = 'ativo' ", [termo, termo, termo, termo]);
            return resultados;
        } catch (error) {
            console.log("Erro ao buscar resenhas");
            console.log(error);
            return error;
        }
    },
    comentarResenha: async (dadosAvaliacao) => {
        try {
            const [resultados] = await pool.query("insert into AVALIACAO_RESENHA set ?", [dadosAvaliacao])
            return resultados
        } catch (error) {
            console.log("----------- ERRO AO COMENTAR NA RESENHA -----------")
            return error
        }
    },
    findComentariosByIdResenha: async (idResenha) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM AVALIACAO_RESENHA WHERE RESENHAS_ID_RESENHAS = ?", [idResenha])
            return resultados
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR COMENTARIOS DA RESENHA -----------")
            console.log(error)
            return error
        }
    },
    verificarCurtida: async (idResenha, idUsuario) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_RESENHAS WHERE RESENHAS_ID_RESENHAS = ? AND USUARIOS_ID_USUARIO = ?", [idResenha, idUsuario])
            if (resultados[0].total > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDA DA RESENHA -----------")
            console.log(error)
            return error
        }
    },
    verificarCurtidasDaResenha: async (idResenha) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_RESENHAS WHERE RESENHAS_ID_RESENHAS = ?", [idResenha])
            return resultados[0].total
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDA DA RESENHA -----------")
            console.log(error)
            return error
        }
    },
    curtirResenha: async (dadosCurtida) => {
        try {
            const [resultados] = await pool.query("INSERT INTO FAVORITO_RESENHAS SET ?", [dadosCurtida]);
            return resultados;
        } catch (error) {
            console.error("Erro ao curtir", error);
            throw error;
        }
    },
    removerCurtidaResenha: async (idPost, idUser) => {
        try {
            const [resultados] = await pool.query("DELETE FROM FAVORITO_RESENHAS WHERE RESENHAS_ID_RESENHAS = ? AND USUARIOS_ID_USUARIO = ? ", [idPost, idUser]);
            return resultados;
        } catch (error) {
            console.error("Erro ao remover curtida", error);
            throw error;
        }
    },
    findResenhasByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS WHERE ID_RESENHAS IN (?) ", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
}

module.exports = resenhaModel