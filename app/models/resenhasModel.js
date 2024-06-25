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
            const [resultado] = await pool.query("SELECT * FROM RESENHAS WHERE ID_RESENHAS = ?", idResenha)
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    }
}

module.exports = resenhaModel