var pool = require("../../config/poolConn");

const usuariosModel = {
    create: async (dadosForm) => {
        try {
            const [resultados] = await pool.query("insert into USUARIOS set ?", [dadosForm])
            return resultados
        } catch (error) {
            return error
        }
    },
    findContato: async (contato) => {
        try{
            const [resultados] = await pool.query("select * from USUARIOS where CONTATO = ?", [contato])
            return resultados
        }catch(error){
            return error
        }
    }
}

module.exports = usuariosModel;