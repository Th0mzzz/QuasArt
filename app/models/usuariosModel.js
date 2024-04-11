var pool = require("../../config/poolConn");

const usuariosModel = {
    create: async(dadosForm) =>{
        try{
            const [resultados] = await pool.query("insert into ")
        }catch(error){
            return error
        }
    }
}