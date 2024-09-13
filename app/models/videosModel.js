var pool = require("../../config/poolConn");
const videosModel = {
    create: async (dadosVideo)=>{
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
    buscarPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT * FROM VIDEOS WHERE ID_VIDEOS = ?", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    
}

module.exports = videosModel;
