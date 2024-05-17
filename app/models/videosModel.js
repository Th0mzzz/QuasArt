var pool = require("../../config/poolConn");
const videosModel = {
    create: async (dadosVideo)=>{
        try {
            const [resultados] = await pool.query("insert into set ?", [dadosVideo])
            return resultados
        } catch (error) {
            return error
        }
    }
}

module.exports = videosModel;
