var pool = require("../../config/poolConn");
const fichasModel = {
    create: async (dadosFicha)=>{
        try {
            const [resultados] = await pool.query("insert into FICHAS set ?", [dadosFicha])
            return resultados
        } catch (error) {
            return error
        }
    },
    contarFichasPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT count(*) FROM FICHAS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
}

module.exports = fichasModel;
