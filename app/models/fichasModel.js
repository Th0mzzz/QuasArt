var pool = require("../../config/poolConn");
const fichasModel = {
    createFicha: async (dadosFicha) => {
        try {
            const [resultados] = await pool.query("insert into FICHAS set ?", [dadosFicha])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            return error
        }
    },
    createPrevia: async (dadosPrevia) => {
        try {
            const [resultados] = await pool.query("insert into PREVIAS set ?", [dadosPrevia])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            return error
        }
    },
    findFichaByIdObra: async (idObra) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE ID_OBRA = ? AND STATUS_FICHA = 'ativo'", [idObra])
            return resultados[0]
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    findPreviasByIdObra: async (idObra) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM PREVIAS WHERE FICHAS_ID_OBRA = ?", [idObra])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    findFichasByIdUser: async (idUser) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE USUARIOS_ID_USUARIO = ? AND STATUS_FICHA = 'ativo'", [idUser])
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
    findFichasEmAlta: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE STATUS_FICHA = 'ativo'")
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    findFichasRecentes: async () => {
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE STATUS_FICHA = 'ativo' ORDER BY ID_OBRA DESC LIMIT 100")
            return resultados
        } catch (error) {
            console.log("erro no buscar ID")
            console.log(error)
            return error
        }
    },
    deletePreviasPorIdObra: async (idObra) => {
        try {
            const [resultados] = await pool.query("DELETE FROM PREVIAS WHERE FICHAS_ID_OBRA = ?", [idObra])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    updateFicha: async (idFicha, dadosAtualizados) => {
        try {
            const [resultados] = await pool.query("UPDATE FICHAS SET ? WHERE ID_OBRA = ?", [dadosAtualizados, idFicha]);
            return resultados;
        } catch (error) {
            console.log("Erro ao atualizar ficha");
            return error;
        }
    },
    acharPorTermo: async (termo) => {
        try {
            const [resultados] = await pool.query("select * from FICHAS where NOME_OBRA LIKE ? AND STATUS_FICHA = 'ativo' OR DESCR_OBRA LIKE ? AND STATUS_FICHA = 'ativo' OR HASHTAG_OBRA LIKE ? AND STATUS_FICHA = 'ativo' ", [termo, termo, termo]);
            return resultados;
        } catch (error) {
            console.log("Erro ao buscar fichas");
            return error;
        }
    },
    comentarFicha: async (dadosAvaliacao) => {
        try {
            const [resultados] = await pool.query("insert into AVALIACAO_FICHA set ?", [dadosAvaliacao])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de avaliação de ficha -----------")
            return error
        }
    },
    findComentariosByIdObra: async (idObra) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM AVALIACAO_FICHA WHERE FICHAS_ID_OBRA = ?", [idObra])
            return resultados
        } catch (error) {
            console.log("----------- Erro no model de ficha -----------")
            console.log(error)
            return error
        }
    },
    verificarCurtida: async (idFicha, idUsuario) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_FICHAS WHERE FICHAS_ID_OBRA = ? AND USUARIOS_ID_USUARIO = ?", [idFicha, idUsuario])
            if (resultados[0].total > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDA DA FICHA -----------")
            console.log(error)
            return error
        }
    },
    verificarCurtidasDaFicha: async (idFicha) => {
        try {
            const [resultados] = await pool.query("SELECT count(*) AS total FROM FAVORITO_FICHAS WHERE FICHAS_ID_OBRA = ?", [idFicha])
            return resultados[0].total
        } catch (error) {
            console.log("----------- ERRO AO BUSCAR CURTIDAS DA FICHA  -----------")
            console.log(error)
            return error
        }
    },
    curtirFicha: async (dadosCurtida) => {
        try {
            const [resultados] = await pool.query("INSERT INTO FAVORITO_FICHAS SET ?", [dadosCurtida]);
            return resultados;
        } catch (error) {
            console.error("Erro ao curtir", error);
            throw error;
        }
    },
    removerCurtidaFicha: async (idPost, idUser) => {
        try {
            const [resultados] = await pool.query("DELETE FROM FAVORITO_FICHAS WHERE FICHAS_ID_OBRA = ? AND USUARIOS_ID_USUARIO = ? ", [idPost, idUser]);
            return resultados;
        } catch (error) {
            console.error("Erro ao remover curtida", error);
            throw error;
        }
    },
    findFichasByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM FICHAS WHERE ID_OBRA IN (?) ", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
    
}

module.exports = fichasModel;
