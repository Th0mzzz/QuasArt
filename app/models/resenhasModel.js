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
            console.log("Erro ao atualizar ficha");
            return error;
        }
    },
}

module.exports = resenhaModel