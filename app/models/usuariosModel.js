var pool = require("../../config/poolConn");

const usuariosModel = {
    createUser: async (dadosForm) => {
        try {
            const [resultados] = await pool.query("insert into USUARIOS set ?", [dadosForm])
            return resultados
        } catch (error) {
            throw error
        }
    },
    findUserByContato: async (contato) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CONTATO = ? AND STATUS_USUARIO = 'ativo' ", [contato])
            return resultados
        } catch (error) {
            throw error
        }
    },
    findUserByNickname: async (nickname) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where NICKNAME_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [nickname])
            return resultados

        } catch (error) {
            console.log("Erro ao buscar usuário", error);
            throw error;
        }
    },
    findUserByEmail: async (email) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where EMAIL_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [email])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findUserByCpf: async (cpf) => {
        try {
            const [resultados] = await pool.query("select * from USUARIOS where CPF_USUARIO = ? AND STATUS_USUARIO = 'ativo' ", [cpf])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar e-mail", error);
            throw error;
        }
    },
    findPasswordByUser: async (usuario) => {
        try {
            const [resultados] = await pool.query("SELECT SENHA_USUARIO FROM USUARIOS WHERE NICKNAME_USUARIO = ? AND STATUS_USUARIO = 'ativo'", [usuario])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    },
    findUserById: async (id) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID_USUARIO = ? AND STATUS_USUARIO = 'ativo' LIMIT 1", [id])
            return resultados

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            throw error;
        }
    },
    updateUser: async (dadosForm, id) => {
        try {
            const [resultados] = await pool.query("UPDATE USUARIOS SET ? WHERE ID_USUARIO = ? ", [dadosForm, id])
            console.log(resultados)
            return resultados

        } catch (error) {
            console.error("Erro ao atualizar usuário", error);
            throw error;
        }
    },
    findUsersByIds: async (ids) => {
        try {
            const [resultados] = await pool.query("SELECT * FROM USUARIOS WHERE ID_USUARIO IN (?) ", [ids]);
            return resultados;
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            throw error;
        }
    },
    contarCurtidasUsuario: async (idUser) => {
        try {
            
            const [fichas] = await pool.query(
                `SELECT ID_OBRA FROM FICHAS WHERE USUARIOS_ID_USUARIO = ?`, [idUser]
            );

            const [resenhas] = await pool.query(
                `SELECT ID_RESENHAS FROM RESENHAS WHERE USUARIOS_ID_USUARIO = ?`, [idUser]
            );

            const [videos] = await pool.query(
                `SELECT ID_VIDEOS FROM VIDEOS WHERE USUARIOS_ID_USUARIO = ?`, [idUser]
            );

       
            const fichaIds = fichas.map(ficha => ficha.ID_OBRA);
            const resenhaIds = resenhas.map(resenha => resenha.ID_RESENHAS);
            const videoIds = videos.map(video => video.ID_VIDEOS);

            
            if (fichaIds.length === 0 && resenhaIds.length === 0 && videoIds.length === 0) {
                return 0;
            }

            
            const [curtidasFichas] = fichaIds.length > 0
                ? await pool.query(
                    `SELECT COUNT(*) AS totalCurtidas FROM FAVORITO_FICHAS WHERE FICHAS_ID_OBRA IN (?)`, [fichaIds]
                )
                : [{ totalCurtidas: 0 }];

            
            const [curtidasResenhas] = resenhaIds.length > 0
                ? await pool.query(
                    `SELECT COUNT(*) AS totalCurtidas FROM FAVORITO_RESENHAS WHERE RESENHAS_ID_RESENHAS IN (?)`, [resenhaIds]
                )
                : [{ totalCurtidas: 0 }];

            
            const [curtidasVideos] = videoIds.length > 0
                ? await pool.query(
                    `SELECT COUNT(*) AS totalCurtidas FROM FAVORITO_VIDEOS WHERE VIDEOS_ID_VIDEOS IN (?)`, [videoIds]
                )
                : [{ totalCurtidas: 0 }];

            
            const totalCurtidas = (curtidasFichas[0].totalCurtidas || 0)
                + (curtidasResenhas[0].totalCurtidas || 0)
                + (curtidasVideos[0].totalCurtidas || 0);

            return totalCurtidas;

        } catch (error) {
            console.log("Erro ao buscar curtidas do usuário", error);
            return error;
        }
    }
}

module.exports = usuariosModel;