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
    }
}

module.exports = resenhaModel