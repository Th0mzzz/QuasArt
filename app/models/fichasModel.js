var pool = require("../../config/poolConn");
const fichasModel = {
    createFicha: async (dadosFicha)=>{
        try {
            const [resultados] = await pool.query("insert into FICHAS set ?", [dadosFicha])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            return error
        }
    },
    createPrevia: async (dadosPrevia)=>{
        try {
            const [resultados] = await pool.query("insert into PREVIAS set ?", [dadosPrevia])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            return error
        }
    },
    findFichaByIdObra: async(idObra)=>{
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE ID_OBRA = ?", [idObra])
            return resultados[0]
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    findPreviasByIdObra: async(idObra)=>{
        try {
            const [resultados] = await pool.query("SELECT * FROM PREVIAS WHERE FICHAS_ID_OBRA = ?", [idObra])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    findFichasByIdUser: async(idUser)=>{
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    contarFichasPorId: async (idUser) => {
        try {
            const [resultado] = await pool.query("SELECT count(*) FROM FICHAS WHERE USUARIOS_ID_USUARIO = ?", [idUser])
            return resultado[0]
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
}

module.exports = fichasModel;
