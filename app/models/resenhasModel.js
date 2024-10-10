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
            const [resultado] = await pool.query("SELECT * FROM RESENHAS WHERE ID_RESENHAS = ?", [idResenha])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    buscarPorIdDeUser: async (idUser) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    contarResenhasPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT count(*) FROM RESENHAS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    findResenhasEmAlta: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS")
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    findResenhasRecentes: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM RESENHAS ORDER BY ID_RESENHAS DESC LIMIT 100")
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
            return error;
        }
    },
    acharPorTermo:async (termo)=>{
        try {
            const [resultados] = await pool.query("select * from RESENHAS where TITULO_RESENHA LIKE ? OR DESCR_RESENHA LIKE ? OR HASHTAG_RESENHA LIKE ? OR TEXTO_RESENHA LIKE ? ", [termo, termo, termo, termo]);
            return resultados;
        } catch (error) {
            console.log("Erro ao buscar resenhas");
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
}

module.exports = resenhaModel