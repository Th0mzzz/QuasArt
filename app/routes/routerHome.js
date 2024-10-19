var express = require("express");
var router = express.Router();
// MIDDLEWARES -------------
const middleWares = require("../sessions/middleswares");
// CONTROLLERS -------------
const usuariosController = require("../controller/usuariosController");
const resenhaControl = require("../controller/resenhasController");
const videoControl = require("../controller/videosController");
const fichasControl = require("../controller/fichasController");
// UTIL --------------- 
const upload = require("../util/upload");
const uploadCapaResenha = upload("./app/public/img/imagens-servidor/capas-img/", 5, ['jpeg', 'jpg', 'png', 'webp']);
const uploadMultiplo = require("../util/uploadMultiplo");
// MODELS -----------------------
const resenhaModel = require("../models/resenhasModel");
const fichasModel = require("../models/fichasModel");
const usuariosModel = require("../models/usuariosModel");
const videosModel = require("../models/videosModel");
const adminModel = require("../models/adminModel");

// Página de falha de autenticação ---------
const destinoDeFalha = {
    page: "../partial/template-login/login",
    modal: "fechado",
    erros: null,
    valores: "",
    incorreto: ""
}

// ---------------------------------------- GETS -------------------------------------------------- 

// ---------- PÁGINAS DA HOME -------------

// pagina inicial
router.get("/", async function (req, res) {
    let token = null
    if (req.session.logado == 0 && req.session.autenticado.autenticado != null) {
        let msg = "Muito bom te ter de volta,"
        if (req.session.cadastro) { msg = "Bem-vindo(a) ao Quasart," }
        token = { msg: msg, usuario: req.session.autenticado.autenticado }
        req.session.logado = req.session.logado + 1
    }
    try {

        const resenhas = await resenhaModel.findResenhasEmAlta();
        const reseRecentes = await resenhaModel.findResenhasRecentes();
        const fichas = await fichasModel.findFichasEmAlta();
        const fichasRecentes = await fichasModel.findFichasRecentes();
        const idsResenha = [];
        const idsFicha = [];


        // Aqui se coleta todos os ids que estão nas resenhas e fichas e guarda nos arrays
        for (const r of [...resenhas, ...reseRecentes]) {
            if (!idsResenha.includes(r.USUARIOS_ID_USUARIO)) {
                idsResenha.push(r.USUARIOS_ID_USUARIO);
            }
        }

        for (const f of [...fichas, ...fichasRecentes]) {
            if (!idsFicha.includes(f.USUARIOS_ID_USUARIO)) {
                idsFicha.push(f.USUARIOS_ID_USUARIO);
            }
        }

        //  aqui eu busco os usuarios com base nos ids achados

        const [usuariosResenhas, usuariosFichas] = await Promise.all([
            idsResenha.length > 0 ? usuariosModel.findUsersByIds(idsResenha) : [],
            idsFicha.length > 0 ? usuariosModel.findUsersByIds(idsFicha) : []
        ]);

        //  Aqui eu crio um outro array
        const mapUsuariosResenhas = Object.fromEntries(usuariosResenhas.map(usuario => [usuario.ID_USUARIO, usuario]));
        const mapUsuariosFichas = Object.fromEntries(usuariosFichas.map(usuario => [usuario.ID_USUARIO, usuario]));


        const posts = {
            resenhas: {
                recentes: reseRecentes.map(r => ({
                    ...r,
                    usuario: mapUsuariosResenhas[r.USUARIOS_ID_USUARIO]
                })
                ),
                alta: resenhas.map(r => ({
                    ...r,
                    usuario: mapUsuariosResenhas[r.USUARIOS_ID_USUARIO]
                })),
            },
            fichas: {
                recentes: fichasRecentes.map(f => {
                    const dataFicha = new Date(f.DATA_FICHA);
                    const dataFormatada = dataFicha.toISOString().split('T')[0];

                    return {
                        ...f,
                        usuario: mapUsuariosFichas[f.USUARIOS_ID_USUARIO],
                        DATA_FICHA: dataFormatada
                    };
                }),
                alta: fichas.map(f => {

                    const dataFicha = new Date(f.DATA_FICHA);
                    const dataFormatada = dataFicha.toISOString().split('T')[0];

                    return {
                        ...f,
                        usuario: mapUsuariosFichas[f.USUARIOS_ID_USUARIO],
                        DATA_FICHA: dataFormatada
                    };
                }),
            },
            destaques: "",
        };


        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/inicial-home",
            classePagina: "inicialHome",
            token: token,
            postagens: posts
        }
        res.render("./pages/template-home", jsonResult)
    } catch (error) {
        console.log(error)
        res.status(404).render("pages/error-404.ejs");
    }

});
// pagina de assinatura
router.get("/plus-page", function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/plus-page",
        classePagina: "assinatura",
        token: token
    }

    res.render("./pages/template-home", jsonResult)
});

// Pagina de pesquisa
router.get("/pesquisar", function (req, res) {
    const token = null
    const jsonResult = {
        page: "../partial/template-home/pesquisa-home",
        classePagina: "pesquisar",
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        token: token,
        posts: null,
    }
    res.render("./pages/template-home", jsonResult)
});

// pagina de perfil
router.get("/profile",

    // Verificar se o idUser está sendo passado na URL. Se estiver quer dizer que não é necessário verificar se está logado ou não.
    (req, res, next) => {
        if (req.query.idUser && req.query.idUser != null) {
            usuariosController.mostrarPageProfile(req, res)
        } else {
            next()
        }
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        usuariosController.mostrarPageProfile(req, res)
    });


// Home de publicações
router.get("/publicar",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        const token = null
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/publicar-home",
            classePagina: "publicar",
            token: token
        }
        res.render("./pages/template-home", jsonResult)
    });


// pagina de publicar videos
router.get("/via-videos-pub",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        const token = null
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/pub-pages/videos-pub",
            classePagina: "publicar",
            erros: null,
            token: token
        }
        res.render("./pages/template-home", jsonResult)
    });
router.get("/attvideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        let idVideo = req.query.idVideo
        if (!idVideo) {
            res.status(404).render("pages/error-404.ejs");
        } else {
            let video = await videosModel.buscarPorId(idVideo)

            if (video.USUARIOS_ID_USUARIO != req.session.autenticado.id) {
                return res.redirect("/")
            }

            const token = null
            const jsonResult = {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/template-home/pub-pages/videos-att",
                classePagina: "publicar",
                erros: null,
                token: token,
                valores: {
                    capaVideo: video.CAPA_VIDEO,
                    tituloVideo: video.NOME_VIDEO,
                    descricao: video.DESCR_VIDEO,
                    idVideo: idVideo,
                    video: video.CAMINHO_VIDEO
                },
                tags: video.HASHTAG_VIDEO.split(","),
            }
            res.render("./pages/template-home", jsonResult)
        }
        const token = null
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/pub-pages/videos-pub",
            classePagina: "publicar",
            erros: null,
            token: token
        }
        res.render("./pages/template-home", jsonResult)
    });


// pagina de publicar fichas
router.get("/ficha-espacial-pub",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        const token = null
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/pub-pages/fichas-pub",
            classePagina: "publicar",
            erros: null,
            token: token,
            valores: null,
            tags: null
        }
        res.render("./pages/template-home", jsonResult)
    });

router.get("/attficha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {

        try {
            let idFicha = req.query.idFicha
            if (!idFicha) {
                res.status(404).render("pages/error-404.ejs");
            } else {
                let ficha = await fichasModel.findFichaByIdObra(idFicha)

                if (ficha.USUARIOS_ID_USUARIO != req.session.autenticado.id) {
                    return res.redirect("/")
                }
                let previas = await fichasModel.findPreviasByIdObra(idFicha)
                const token = null
                const jsonResult = {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/template-home/pub-pages/fichas-att",
                    classePagina: "publicar",
                    erros: null,
                    token: token,
                    valores: {
                        capaFicha: ficha.CAMINHO_CAPA,
                        nomeObra: ficha.NOME_OBRA,
                        sinopse: ficha.DESCR_OBRA,
                        previas: previas,
                        idFicha: idFicha
                    },
                    tags: ficha.HASHTAG_OBRA.split(","),
                }
                res.render("./pages/template-home", jsonResult)
            }
        } catch (error) {
            console.log(error)
            res.status(404).render("pages/error-404.ejs");
        }

    });

// pagina de publicar resenhas
router.get("/resenha-cosmica-pub",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        const token = null
        const jsonResult = {
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            page: "../partial/template-home/pub-pages/resenhas-pub",
            classePagina: "publicar",
            erros: null,
            valores: null,
            token: token,
            tags: null
        }
        res.render("./pages/template-home", jsonResult)
    });
router.get("/attresenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        try {
            let idResenha = req.query.idResenha

            if (!idResenha) {
                res.status(404).render("pages/error-404.ejs");
            } else {
                let resenha = await resenhaModel.buscarPorId(idResenha);
                if (resenha.USUARIOS_ID_USUARIO != req.session.autenticado.id) {
                    return res.redirect("/");
                }
                const token = null;
                const jsonResult = {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/template-home/pub-pages/resenhas-att",
                    classePagina: "publicar",
                    erros: null,
                    token: token,
                    valores: {
                        titulo: resenha.TITULO_RESENHA,
                        textoResenha: resenha.TEXTO_RESENHA,
                        descricao: resenha.DESCR_RESENHA,
                        capaResenha: resenha.CAPA_CAMINHO,
                        idResenha: resenha.ID_RESENHAS
                    },
                    tags: resenha.HASHTAG_RESENHA.split(","),
                };
                res.render("./pages/template-home", jsonResult)
            }
        } catch (error) {
            console.log(error)
            res.status(404).render("pages/error-404.ejs");
        }
    });

// ------- Página sobre o Quarsart -------

router.get("/sobre", function (req, res) {
    const token = null
    const jsonResult = {
        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
        page: "../partial/template-home/sobre",
        classePagina: "",
        token: token
    }
    res.render("./pages/template-home", jsonResult)
})

// --------- PAGINA DE VIDEOS ----------

router.get("/videos", function (req, res) {
    videoControl.mostrarVideo(req, res)
});

// -------- PÁGINAS DE VISUALIZAÇÃO -------------

router.get("/view-resenha", function (req, res) {
    resenhaControl.mostrarResenha(req, res)
});

router.get("/view-ficha", function (req, res) {
    fichasControl.mostrarFicha(req, res)
});


// ------- CRIAÇÃO DE POSTS -------


// Form de criação de Resenha
router.post("/criarResenha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadCapaResenha("capaResenha"),
    resenhaControl.validacaoResenha,
    function (req, res) {
        resenhaControl.postarResenha(req, res)
    });
router.post("/atualizarResenha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadCapaResenha("capaResenha"),
    resenhaControl.validacaoResenha,
    function (req, res) {
        resenhaControl.atualizarResenha(req, res)
    });
// Form de criação de Video
router.post("/criarVideo",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadMultiplo([
        { name: 'capaVideo', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png'], fileSize: 5, maxCount: 1 },
        { name: 'video', caminho: './app/public/img/imagens-servidor/videos/', extensoes: ['mp4', 'avi'], fileSize: 400, maxCount: 1 }
    ]),
    videoControl.validacaoVideo,
    function (req, res) {
        videoControl.postarVideo(req, res)
    })
router.post("/atualizarVideo",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadMultiplo([
        { name: 'capaVideo', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png'], fileSize: 5, maxCount: 1 },
        { name: 'video', caminho: './app/public/img/imagens-servidor/videos/', extensoes: ['mp4', 'avi'], fileSize: 400, maxCount: 1 }
    ]),
    videoControl.validacaoVideo,
    function (req, res) {
        videoControl.atualizarVideo(req, res)
    })
// Form de criação de Ficha
router.post("/criarFicha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadMultiplo([
        { name: 'capaFicha', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png', "webp"], fileSize: 5, maxCount: 1 },
        { name: 'previas', caminho: './app/public/img/imagens-servidor/previas/', extensoes: ['mp4', 'avi', 'jpeg', 'jpg', 'png', 'webp'], fileSize: 200, maxCount: 8 }
    ]),
    fichasControl.validacaoFicha,
    function (req, res) {
        console.log(req.files)
        fichasControl.postarFicha(req, res)
    })
router.post("/atualizarFicha",
    (req, res, next) => {
        req.session.erroMulter = [];
        next();
    },
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    uploadMultiplo([
        { name: 'capaFicha', caminho: './app/public/img/imagens-servidor/capas-img/', extensoes: ['jpeg', 'jpg', 'png', "webp"], fileSize: 5, maxCount: 1 },
        { name: 'previas', caminho: './app/public/img/imagens-servidor/previas/', extensoes: ['mp4', 'jpeg', 'jpg', 'png', 'webp'], fileSize: 200, maxCount: 8 }
    ]),
    fichasControl.validacaoFicha,
    function (req, res) {
        console.log(req.files)
        fichasControl.atualizarFicha(req, res)
    })

// ------- Pesquisar -------
router.post("/fazerPesquisa", async function (req, res) {
    try {
        const termo = `%${req.body.pesquisaInput}%`;
        const fichas = await fichasModel.acharPorTermo(termo) || [];
        const videos = await videosModel.acharPorTermo(termo) || [];
        const resenhas = await resenhaModel.acharPorTermo(termo) || [];


        const idsResenha = [];
        const idsFicha = [];
        const idsVideo = [];


        if (fichas.length === 0 && videos.length === 0 && resenhas.length === 0) {
            const token = null;
            const jsonResult = {
                page: "../partial/template-home/pesquisa-home",
                classePagina: "pesquisar",
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                token: token,
                posts: "none",
            };
            return res.render("./pages/template-home", jsonResult);
        }


        for (const r of resenhas) {
            if (!idsResenha.includes(r.USUARIOS_ID_USUARIO)) {
                idsResenha.push(r.USUARIOS_ID_USUARIO);
            }
        }

        for (const f of fichas) {
            if (!idsFicha.includes(f.USUARIOS_ID_USUARIO)) {
                idsFicha.push(f.USUARIOS_ID_USUARIO);
            }
        }

        for (const v of videos) {
            if (!idsVideo.includes(v.USUARIOS_ID_USUARIO)) {
                idsVideo.push(v.USUARIOS_ID_USUARIO);
            }
        }


        const [usuariosResenhas, usuariosFichas, usuariosVideos] = await Promise.all([
            idsResenha.length > 0 ? usuariosModel.findUsersByIds(idsResenha) : [],
            idsFicha.length > 0 ? usuariosModel.findUsersByIds(idsFicha) : [],
            idsVideo.length > 0 ? usuariosModel.findUsersByIds(idsVideo) : []
        ]);


        const mapUsuariosResenhas = Object.fromEntries(usuariosResenhas.map(usuario => [usuario.ID_USUARIO, usuario]));
        const mapUsuariosFichas = Object.fromEntries(usuariosFichas.map(usuario => [usuario.ID_USUARIO, usuario]));
        const mapUsuariosVideos = Object.fromEntries(usuariosVideos.map(usuario => [usuario.ID_USUARIO, usuario]));


        const posts = {
            resenhas: resenhas.map(r => ({
                ...r,
                usuario: mapUsuariosResenhas[r.USUARIOS_ID_USUARIO] || null
            })),
            fichas: fichas.map(f => {
                const dataFicha = new Date(f.DATA_FICHA);
                const dataFormatada = dataFicha.toISOString().split('T')[0];

                return {
                    ...f,
                    usuario: mapUsuariosFichas[f.USUARIOS_ID_USUARIO] || null,
                    DATA_FICHA: dataFormatada
                };
            }),
            videos: videos.map(v => ({
                ...v,
                usuario: mapUsuariosVideos[v.USUARIOS_ID_USUARIO] || null
            })),
        };


        const jsonResult = {
            page: "../partial/template-home/pesquisa-home",
            classePagina: "pesquisar",
            foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
            token: null,
            posts: posts
        };

        return res.render("./pages/template-home", jsonResult);

    } catch (error) {
        console.log(error)
        res.status(404).render("pages/error-404.ejs");

    }
});

// COMENTAR --------

router.post("/comentarFicha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        fichasControl.avaliarFicha(req, res)
    }
)
router.post("/comentarResenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        resenhaControl.avaliarResenha(req, res)
    }
)
router.post("/comentarVideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    function (req, res) {
        videoControl.avaliarVideo(req, res)
    }
)


// CURTIR

router.post("/curtirResenha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        const idResenha = req.query.idResenha
        if (!idResenha) {
            console.log("erro ao encontrar resenha")
            return res.status(404).render("pages/error-404.ejs");
        }
        const isCurtido = req.session.autenticado && req.session.autenticado.id != null ? await resenhaModel.verificarCurtida(idResenha, req.session.autenticado.id) : false
        if (isCurtido) {
            await resenhaModel.removerCurtidaResenha(idResenha, req.session.autenticado.id)
        } else {
            await resenhaModel.curtirResenha({ RESENHAS_ID_RESENHAS: idResenha, USUARIOS_ID_USUARIO: req.session.autenticado.id })
        }
        res.redirect(`/view-resenha?idResenha=${idResenha}`)
    }
)
router.post("/curtirFicha",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        const idFicha = req.query.idFicha
        if (!idFicha) {
            console.log("erro ao encontrar ficha")
            return res.status(404).render("pages/error-404.ejs");
        }
        const isCurtido = req.session.autenticado && req.session.autenticado.id != null ? await fichasModel.verificarCurtida(idFicha, req.session.autenticado.id) : false
        if (isCurtido) {
            await fichasModel.removerCurtidaFicha(idFicha, req.session.autenticado.id)
        } else {
            await fichasModel.curtirFicha({ FICHAS_ID_OBRA: idFicha, USUARIOS_ID_USUARIO: req.session.autenticado.id })
        }
        res.redirect(`/view-ficha?idFicha=${idFicha}`)
    }
)
router.post("/curtirVideo",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        const idVideo = req.query.idVideo
        if (!idVideo) {
            console.log("erro ao encontrar video")
            return res.status(404).render("pages/error-404.ejs");
        }
        const isCurtido = req.session.autenticado && req.session.autenticado.id != null ? await videosModel.verificarCurtida(idVideo, req.session.autenticado.id) : false
        if (isCurtido) {
            await videosModel.removerCurtidaVideo(idVideo, req.session.autenticado.id)
        } else {
            await videosModel.curtirVideo({ VIDEOS_ID_VIDEOS: idVideo, USUARIOS_ID_USUARIO: req.session.autenticado.id })
        }
        res.redirect(`/videos?idVideo=${idVideo}`)
    }
)


// DENUNCIAR 

router.post("/denunciarUsuario",
    middleWares.verifyAutenticado,
    middleWares.verifyAutorizado("pages/template-login", destinoDeFalha, [1, 2, 3, 4]),
    async function (req, res) {
        const idUser = req.query.idUser
        if (!idUser) {
            console.log("Erro ao encontrar o usuário")
            return res.status(404).render("pages/error-404.ejs");
        }
        try {
            const { denunciaRadio, descricaoDenuncia } = req.body
            const denuncia = {
                ID_DENUNCIADO: idUser,
                DESCRICAO_DENUNCIA: descricaoDenuncia != '' ? descricaoDenuncia : null,
                TIPO_DENUNCIA: denunciaRadio,
            }
            await adminModel.denunciar(denuncia, 'DENUNCIAS_USUARIOS')
            req.session.token = { msg: 'Usuário denunciado com sucesso!', type: 'success', contagem: 0 }
            res.redirect(`/profile?idUser=${idUser}`)

        } catch (error) {
            console.log(error)
            req.session.token = { msg: 'Erro ao denunciar usuário!', type: 'danger', contagem: 0 }
            res.redirect(`/profile?idUser=${idUser}`)
        }

    }
)

module.exports = router;