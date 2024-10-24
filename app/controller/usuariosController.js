const usuariosModel = require("../models/usuariosModel")
const { body, validationResult } = require("express-validator")
const moment = require("moment")
var bcrypt = require("bcryptjs")
const { removeImg } = require("../util/removeImg")
const resenhaModel = require("../models/resenhasModel")
const fichasModel = require("../models/fichasModel")
const videosModel = require("../models/videosModel")
var salt = bcrypt.genSaltSync(8)
const jwt = require("jsonwebtoken")
const { enviarEmail, enviarEmailAtivacao, enviarEmailRecuperarSenha } = require("../util/sendEmail")

const dotenv = require("dotenv");
dotenv.config();


const usuariosController = {

    // Validação do form de cadastro
    regrasValidacaoCriarConta: [
        // verifica nome tamanho max e min
        body("nome")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras!"),
        // verifica se a idade é valida, e dps se define a idade minima que é a data atual menos 13 anos. Depois verifica se a dataNascimento é depois da dataminima, se for, ele cancela e retorna o erro dizendo que é necessario ter mais de 13 anos
        body('nascimento')
            .custom(value => {
                const dataNascimento = moment(value, "YYYY-MM-DD");
                const dataMinima = moment().subtract(13, 'years');
                if (dataNascimento.isAfter(dataMinima)) {
                    throw new Error("Necessário ser maior de 13 anos!");
                }
                return true;
            }),
        // verifica se o cpf é valido e se tem 11 digitos, dps verifica se já existe o cpf no banco de dados, se existir ele retorna q o cpf ja está em uso
        body("cpf")
            .isLength({ min: 11, max: 11 }).withMessage("CPF deve ter 11 dígitos")
            .isNumeric().withMessage("CPF deve conter apenas números")
            .bail()
            .custom(async (cpf) => {
                const cpfExistente = await usuariosModel.findUserByCpf(cpf)
                if (cpfExistente.length > 0) {
                    throw new Error("CPF já em uso! Tente outro");
                }
                return true;
            })
            .bail()
            .custom(async cpf => {
                cpf = cpf.replace(/[^\d]+/g, '');
                if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
                    throw new Error('CPF inválido');
                }
                let soma = 0;
                let resto;
                for (let i = 1; i <= 9; i++) {
                    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
                }
                resto = (soma * 10) % 11;

                if (resto === 10 || resto === 11) {
                    resto = 0;
                }
                if (resto !== parseInt(cpf.substring(9, 10))) {
                    throw new Error('CPF inválido');
                }

                soma = 0;

                // Validação do segundo dígito verificador
                for (let i = 1; i <= 10; i++) {
                    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
                }
                resto = (soma * 10) % 11;

                if (resto === 10 || resto === 11) {
                    resto = 0;
                }
                if (resto !== parseInt(cpf.substring(10, 11))) {
                    throw new Error('CPF inválido');
                }

                return true;
            }),
        //  verifica se o telefone é valido e faz o mesmo caso do cpf, so que para numero
        body("contato")
            .isMobilePhone('pt-BR').withMessage("Número de telefone inválido")
            .bail()
            .custom(async (contato) => {
                const contatoExistente = await usuariosModel.findUserByContato(contato)
                if (contatoExistente.length > 0) {
                    throw new Error("Telefone já em uso! Tente outro");
                }
                return true;
            }),
        // // verifica se o usuário tem no minimo 4 caracteres ou no maximo 30 e se o usuário digitado existe no banco de dados, caso tenha, retorna como incorreto

        body('usuario')
            .isLength({ min: 4 }).withMessage("Usuário deve ter pelo menos 4 caracteres!")
            .bail()
            .custom(async (usuario) => {
                const usuarioExistente = await usuariosModel.findUserByNickname(usuario)
                if (usuarioExistente[0] === usuario) {
                    throw new Error("Usuário já existe! Tente outro");
                }
                return true;
            }),
        // mesma coisa do telefone so que para email
        body('email')
            .isEmail().withMessage('Deve ser um email válido')
            .bail()
            .custom(async (email) => {
                const emailExistente = await usuariosModel.findUserByEmail(email)
                if (emailExistente.length > 0) {
                    throw new Error("E-mail já em uso! Tente outro");
                }
                return true;
            }),
        // verifica se a senha tem o tamanho minimo de 8 e no max 30 digitos, se pelo menos 1 caracter especial, 1 maiusculo e 1 minusculo, tudo a partir de regex.
        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número inteiro.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    regrasValidacaoAtualizarConta: [
        // verifica nome tamanho max e min
        body("nome")
            .isLength({ min: 3, max: 45 }).withMessage("Nome deve ter de 3 a 45 letras!"),
        // verifica se a idade é valida, e dps se define a idade minima que é a data atual menos 13 anos. Depois verifica se a dataNascimento é depois da dataminima, se for, ele cancela e retorna o erro dizendo que é necessario ter mais de 13 anos
        body('nascimento')
            .custom(value => {
                const dataNascimento = moment(value, "YYYY-MM-DD");
                const dataMinima = moment().subtract(13, 'years');
                if (dataNascimento.isAfter(dataMinima)) {
                    throw new Error("Necessário ser maior de 13 anos!");
                }
                return true;
            }),
        // verifica se o cpf é valido e se tem 11 digitos, dps verifica se já existe o cpf no banco de dados, se existir ele retorna q o cpf ja está em uso
        // // verifica se o usuário tem no minimo 4 caracteres ou no maximo 30 e se o usuário digitado existe no banco de dados, caso tenha, retorna como incorreto
        body('usuario')
            .isLength({ min: 4 }).withMessage("Usuário deve ter pelo menos 4 caracteres!"),
        // mesma coisa do telefone so que para email

    ],
    regrasValidacaoEntrar: [
        // verifica se o usuário tem no minimo 4 caracteres ou no maximo 30.
        body('usuario').isLength({ min: 4, max: 30 }).withMessage("Usuário deve ter pelo menos 4 caracteres!"),
        // verifica se a senha tem o tamanho minimo de 8 e no max 30 digitos, se pelo menos 1 caracter especial, 1 maiusculo e 1 minusculo, tudo a partir de regex.
        body('senha')
            .isLength({ min: 8, max: 30 })
            .withMessage('A senha deve ter pelo menos 8 e no máximo 30 caracteres!')
            .bail()
            .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula.')
            .bail()
            .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula.')
            .bail()
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('A senha deve conter pelo menos um caractere especial.')
            .bail()
    ],
    criarUsuario: async (req, res) => {

        //  Aqui verifico se tem erros de validação no formulário, se tiver carrego a pagina de cadastro novamente com erros, senão pego tds os dados do form, crio um objeto com as colunas do banco e coloco os dados nela(obs: criptografo a senha a partir do bcrypt e armazeno o hash dela.), por fim utilizo uma funçao do banco para inserir no banco, se tiver erros ele mostra a pagina de erro 500.
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("Erros de validação do cadastro")
            console.log(errors)
            const jsonResult = {
                page: "../partial/template-login/cadastro",
                modal: "fechado",
                erros: errors,
                valores: req.body,
                token: null
            }
            res.render("pages/template-login", jsonResult);
        } else {
            const { nome, nascimento, cpf, contato, usuario, email, senha } = req.body
            let hashSenha = bcrypt.hashSync(senha, salt);
            const dadosForm = {
                NOME_USUARIO: nome,
                NICKNAME_USUARIO: usuario,
                CONTATO: contato,
                SENHA_USUARIO: hashSenha,
                DATA_NASC_USUARIO: nascimento,
                CPF_USUARIO: cpf,
                EMAIL_USUARIO: email,
                CAMINHO_FOTO: "perfil-padrao.webp",
                ID_TIPO_USUARIO: 1,
                STATUS_USUARIO: 'inativo',
            }
            try {
                const resultados = await usuariosModel.createUser(dadosForm);
                const token = jwt.sign(
                    {
                        userId: resultados.insertId
                    },
                    process.env.SECRET_KEY
                )

                enviarEmailAtivacao(
                    dadosForm.EMAIL_USUARIO,
                    "Cadastro realizado na QuasArt!",
                    process.env.URL_BASE,
                    token,
                    async () => {
                        const userBd = await usuariosModel.findUserByIdInativo(resultados.insertId);
                        console.log(`------ Usuário ${userBd[0].NICKNAME_USUARIO} cadastrado! ------`)
                        console.log(`------ Verificação enviada para ${userBd[0].EMAIL_USUARIO} ------`)
                        console.log(userBd[0])
                        res.redirect("/entrar")
                    })

            } catch (erros) {
                console.log(erros)

                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });
            }

        }
    },
    entrar: async (req, res) => {
        // Aqui verifico se tem erros de validação no formulário, se tiver carrego a pagina de login novamente com erros, senão busco a partir do um usuário a partir do digitado, e então eu por fim, verifico se o usuario do banco existe e se o hash da senha digitada no form bate com o hash da senha que estava no banco e se a sessão não é null. Se tudo estiver correto ele renderiza a page home, senão ele manda pra page de login como usuário ou senha incorretos
        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render("pages/template-login", { page: "../partial/template-login/login", modal: "fechado", erros: errors, incorreto: null, token: null });
        } else {

            const { usuario, senha } = req.body
            try {
                const userBd = await usuariosModel.findUserByNickname(usuario)
                if (userBd[0] && bcrypt.compareSync(senha, userBd[0].SENHA_USUARIO) && req.session.autenticado.autenticado) {
                    if (userBd[0].ID_TIPO_USUARIO == 4) {
                        console.log(`---------- Administrador ${userBd[0].NICKNAME_USUARIO} logou --------------`)
                        return res.redirect("/adm")
                    }
                    console.log(`---------- Usuário ${userBd[0].NICKNAME_USUARIO} logou --------------`)
                    req.session.cadastro = false
                    res.redirect("/")
                } else {
                    const jsonResult = {
                        page: "../partial/template-login/login",
                        modal: "fechado",
                        erros: null,
                        incorreto: "ativado"
                    }
                    res.render("pages/template-login", jsonResult);
                }

            } catch (erros) {
                console.log(erros)
                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });
            }

        }
    },
    mostrarPageProfile: async (req, res) => {

        // Nessa função verifico se existe o idUser, vindo da query. Se existir eu faço a busca no banco de dados a partir dele, senão, verifico se a sessão existe, se existir eu faço a busca a partir do id de sessão. (Basicamente, no ejs eu na hora que quero chamar um perfil aleatorio eu coloco o idUser na query HTTPS com o valor do id do usuário que quero mostrar. Quando eu quiser chamar meu proprio perfil eu n coloco o idUser no link, fazendo com que ele avançe pra proximo trecho de codigo que é chamar a partir da sessão.) depois disso eu verifico novamente se o usuario chamado no banco e se a sessão existem, se existirem, a variavel isUser é true,caso o contrario será falsa e a página será mostrada como de um outro usuário.
        try {
            const idUser = req.query.idUser
            if (idUser) {
                var user = await usuariosModel.findUserById(idUser)
            } else if (req.session.autenticado && req.session.autenticado.autenticado) {
                var user = await usuariosModel.findUserById(req.session.autenticado.id)
            }
            const resenhasUser = await resenhaModel.buscarPorIdDeUser(user[0].ID_USUARIO)
            const videosUser = await videosModel.buscarPorIdUser(user[0].ID_USUARIO)
            const fichasUser = await fichasModel.findFichasByIdUser(user[0].ID_USUARIO)
            const contagemResenhas = await resenhaModel.contarResenhasPorId(user[0].ID_USUARIO)
            const contagemFichas = await fichasModel.contarFichasPorId(user[0].ID_USUARIO)
            const contagemVideos = await videosModel.contarVideosPorId(user[0].ID_USUARIO)

            var isUser = false
            if (user && req.session.autenticado) {
                if (user[0].ID_USUARIO === req.session.autenticado.id) {
                    isUser = true
                }
            }
            let postagens = contagemResenhas['count(*)'] + contagemFichas['count(*)'] + contagemVideos['count(*)']
            let seguidores = await usuariosModel.findSeguidoresByIdSeguido(user[0].ID_USUARIO)
            let curtidas = await usuariosModel.contarCurtidasUsuario(user[0].ID_USUARIO) > 0 ? await usuariosModel.contarCurtidasUsuario(user[0].ID_USUARIO) : 0
            const estatisticas = {
                postagens: postagens,
                seguidores: seguidores.length > 0 ? seguidores.length : 0,
                curtidas: curtidas,
            }

            const posts = {
                resenhas: resenhasUser.length == 0 ? null : resenhasUser,
                videos: videosUser.length == 0 ? null : videosUser,
                fichas: fichasUser.length == 0
                    ? null
                    : fichasUser.map(f => {
                        const dataFicha = new Date(f.DATA_FICHA);
                        const dataFormatada = dataFicha.toISOString().split('T')[0];

                        return {
                            ...f,
                            DATA_FICHA: dataFormatada
                        }
                    })
            }
        
            let seguindo = req.session.autenticado && req.session.autenticado.id ? await usuariosModel.verifySeguindo(user[0].ID_USUARIO, req.session.autenticado.id) : false;
            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            const jsonResult = {
                page: "../partial/template-home/perfil-home",
                classePagina: isUser ? "perfil" : "",
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                usuario: user[0],
                estatisticas: estatisticas,
                posts: posts,
                isUser: isUser,
                token: token,
                seguidores: seguidores,
                isSeguido: seguindo,
            }

            res.render("./pages/template-home", jsonResult)
        } catch (errors) {
            console.log(errors)
            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            res.status(500).render("pages/template-home", {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/error-500",
                classePagina: "",
                token: token,
            });
        }
    },
    mudarFoto: async (req, res) => {
        let errors = validationResult(req)
        let errosMulter = req.session.erroMulter

        if (!errors.isEmpty() || errosMulter.length > 0) {

            let listaErros = errors.isEmpty() ? { formatter: null, errors: [] } : errors;

            if (errosMulter.length > 0) {
                listaErros.errors.push(...errosMulter)
                if (req.file) removeImg(`./app/public/img/imagens-servidor/perfil/${req.file.filename}`)
            }
            console.log("-------erro-de-validação-foto--------")
            console.log(listaErros)
            console.log(errors)
            console.log(errosMulter)

            const user = req.session.autenticado ? await usuariosModel.findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")

            const jsonResult = {
                page: "../partial/edit-profile/index",
                pageClass: "index",
                usuario: user[0],
                modalAberto: true,
                erros: listaErros,
                token: null
            }
            res.render("./pages/edit-profile", jsonResult)

        } else {

            if (!req.file) {
                console.log("falha ao carregar arquivo!")
                const user = req.session.autenticado ? await usuariosModel.findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
                const jsonResult = {
                    page: "../partial/edit-profile/index",
                    pageClass: "index",
                    usuario: user[0],
                    modalAberto: true,
                    erros: null,
                    token: { msg: 'Falha ao carregar a imagem!', type: 'danger' }
                }
                return res.render("./pages/edit-profile", jsonResult)
            } else {
                try {
                    var caminhoFoto = req.session.autenticado.foto
                    if (caminhoFoto != req.file.filename && caminhoFoto != "perfil-padrao.webp") {
                        removeImg(`./app/public/img/imagens-servidor/perfil/${caminhoFoto}`)
                    }
                    caminhoFoto = req.file.filename
                    let resultado = await usuariosModel.updateUser({ CAMINHO_FOTO: caminhoFoto }, req.session.autenticado.id)
                    const user = await usuariosModel.findUserById(req.session.autenticado.id)

                    req.session.autenticado.foto = caminhoFoto
                    console.log(resultado)
                    const jsonResult = {
                        page: "../partial/edit-profile/index",
                        pageClass: "index",
                        usuario: user[0],
                        modalAberto: false,
                        erros: null,
                        token: { msg: "Foto de usuário atualizada", type: "success" }
                    }
                    res.render("./pages/edit-profile", jsonResult)

                } catch (errors) {
                    console.log(errors)
                    let token = req.session.token ? req.session.token : null;
                    if (token && token.contagem < 1) {
                        req.session.token.contagem++;
                    } else {
                        req.session.token = null;
                    }
                    res.status(500).render("pages/template-home", {
                        foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                        page: "../partial/error-500",
                        classePagina: "",
                        token: token,
                    });

                }
            }

        }

    },
    excluirFoto: async (req, res) => {

        try {
            var caminhoFoto = req.session.autenticado.foto
            if (caminhoFoto != "perfil-padrao.webp") {
                removeImg(`./app/public/img/imagens-servidor/perfil/${caminhoFoto}`)
            }
            caminhoFoto = "perfil-padrao.webp"
            let resultado = await usuariosModel.updateUser({ CAMINHO_FOTO: caminhoFoto }, req.session.autenticado.id)
            const user = await usuariosModel.findUserById(req.session.autenticado.id)
            req.session.autenticado.foto = caminhoFoto
            console.log(resultado)
            const jsonResult = {
                page: "../partial/edit-profile/index",
                pageClass: "index",
                usuario: user[0],
                modalAberto: false,
                erros: null,
                token: { msg: "Foto excluída com sucesso!", type: "success" }
            }
            res.render("./pages/edit-profile", jsonResult)

        } catch (errors) {
            console.log(errors)
            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            res.status(500).render("pages/template-home", {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/error-500",
                classePagina: "",
                token: token,
            });

        }
    },
    atualizarUsuario: async (req, res) => {
        const user = req.session.autenticado ? await usuariosModel.findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            const jsonResult = {
                page: "../partial/edit-profile/dados-pessoais",
                pageClass: "dadosPessoais",
                usuario: user[0],
                erros: errors,
                valores: req.body,
                token: null
            }
            res.render("./pages/edit-profile", jsonResult)
        } else {

            const { nome, nascimento, usuario } = req.body
            dadosForm = {
                NOME_USUARIO: nome,
                NICKNAME_USUARIO: usuario,
                DATA_NASC_USUARIO: nascimento,
            }

            try {
                const resultados = await usuariosModel.updateUser(dadosForm, req.session.autenticado.id);

                if (!resultados.isEmpty) {
                    const user = await usuariosModel.findUserById(req.session.autenticado.id);
                    const data = new Date(user[0].DATA_NASC_USUARIO)
                    const dataFormatada = data.toISOString().split('T')[0];
                    if (resultados.changedRows == 1) {
                        req.session.autenticado = {
                            autenticado: user[0].NOME_USUARIO,
                            id: user[0].ID_USUARIO,
                            foto: user[0].CAMINHO_FOTO,
                            tipo: user[0].ID_TIPO_USUARIO
                        }
                        const jsonResult = {
                            page: "../partial/edit-profile/dados-pessoais",
                            pageClass: "dadosPessoais",
                            usuario: user[0],
                            erros: null,
                            valores: {
                                nome: user[0].NOME_USUARIO,
                                nascimento: dataFormatada,
                                cpf: user[0].CPF_USUARIO,
                                contato: user[0].CONTATO,
                                usuario: user[0].NICKNAME_USUARIO,
                            },
                            token: { msg: "Perfil atualizado com sucesso!", type: "success" }
                        }
                        console.log("Perfil atualizado com sucesso!")
                        res.render("./pages/edit-profile", jsonResult)
                    } else {
                        const jsonResult = {
                            page: "../partial/edit-profile/dados-pessoais",
                            pageClass: "dadosPessoais",
                            usuario: user[0],
                            erros: null,
                            valores: {
                                nome: user[0].NOME_USUARIO,
                                nascimento: dataFormatada,
                                cpf: user[0].CPF_USUARIO,
                                contato: user[0].CONTATO,
                                usuario: user[0].NICKNAME_USUARIO,
                            },
                            token: { msg: "Nenhuma alteração feita", type: "" }
                        }
                        console.log("Nenhuma alteração feita")
                        res.render("./pages/edit-profile", jsonResult)
                    }
                }
            } catch (erros) {
                console.log(erros)
                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });
            }
        }


    },
    attSenha: async (req, res) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)

            const user = req.session.autenticado ? await usuariosModel.findUserById(req.session.autenticado.id) : new Error("Erro ao acessar o banco")

            const jsonResult = {
                page: "../partial/edit-profile/security",
                pageClass: "index",
                usuario: user[0],
                modalAberto: true,
                erros: errors,
                token: null
            }
            res.render("./pages/edit-profile", jsonResult)
        } else {
            try {
                const { senha } = req.body
                let hashSenha = bcrypt.hashSync(senha, salt);
                var resultado = await usuariosModel.updateUser({ SENHA_USUARIO: hashSenha }, req.session.autenticado.id)
                const user = await usuariosModel.findUserById(req.session.autenticado.id)
                console.log(resultado)

                const jsonResult = {
                    page: "../partial/edit-profile/security",
                    pageClass: "security",
                    usuario: user[0],
                    modalAberto: false,
                    erros: null,
                    token: { msg: "Senha alterada com sucesso!", type: "success" }
                }
                res.render("./pages/edit-profile", jsonResult)
            } catch (error) {
                console.log("Erro ao atualizar perfil")
                console.log(error)
                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });
            }

        }
    },
    ativarConta: async (req, res) => {
        try {
            const token = req.query.token
            console.log(token)
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                console.log(decoded)
                if (err) {
                    console.log("Token inválido ou expirado")
                } else {
                    const userBd = await usuariosModel.findUserByIdInativo(decoded.userId)
                    if (!userBd[0]) {
                        return console.log("Usuário não encontrado")
                    }

                    await usuariosModel.updateUser({ STATUS_USUARIO: 'ativo' }, decoded.userId);
                    console.log("Conta ativada!")
                    res.redirect("/entrar")
                }
            })
        } catch (error) {
            console.log(error)
            let token = req.session.token ? req.session.token : null;
            if (token && token.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            res.status(500).render("pages/template-home", {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/error-500",
                classePagina: "",
                token: token,
            });
        }
    },
    verificarTokenRedefinirSenha: async (req, res) => {
        try {
            const token = req.query.token
            if (!token) {
                let alert = req.session.token ? req.session.token : null;
                if (alert && alert.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                return res.status(404).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-404",
                    classePagina: "",
                    token: alert,
                });
            }

            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    req.session.token = { msg: "Link expirado!", type: "danger", contagem: 0 }
                    res.redirect("/esqueceuSenha")
                } else {
                    const jsonResult = {
                        page: "../partial/template-login/esqueceuSenha",
                        token: { msg: "Autenticação realizada com sucesso! Redefina sua senha!", type: "success" },
                        erros: null,
                        idUser: decoded.userId,
                        modalAberto: true
                    }
                    res.render("./pages/template-login", jsonResult)
                }
            })
        } catch (error) {
            console.log(error)
            let alert = req.session.token ? req.session.token : null;
            if (alert && alert.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            res.status(500).render("pages/template-home", {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/error-500",
                classePagina: "",
                token: alert,
            });

        }
    },
    solicitarResetSenha: async (req, res) => {
        let error = validationResult(req)

        if (!error.isEmpty) {
            let alert = req.session.token ? req.session.token : null;
            if (alert && alert.contagem < 1) {
                req.session.token.contagem++;
            } else {
                req.session.token = null;
            }
            const jsonResult = {
                page: "../partial/template-login/esqueceuSenha",
                modal: "fechado",
                erros: error,
                token: alert,
                modalAberto: false
            }
            res.render("pages/template-login", jsonResult);
        } else {
            try {
                const { email } = req.body
                const user = await usuariosModel.findUserByEmail(email)

                const token = jwt.sign(
                    {
                        userId: user[0].ID_USUARIO,
                        expiresIn: "40m"
                    },
                    process.env.SECRET_KEY
                )

                enviarEmailRecuperarSenha(
                    user[0].EMAIL_USUARIO,
                    "Recuperar de senha",
                    process.env.URL_BASE,
                    token,
                    async () => {
                        req.session.token = { msg: "E-mail enviado com sucesso", type: "success", contagem: 0 }
                        res.redirect("/esqueceuSenha")
                    })


            } catch (error) {
                console.log(error)
                let token = req.session.token ? req.session.token : null;
                if (token && token.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: token,
                });

            }
        }
    },
    redefinirSenha: async (req, res) => {
        let idUser = req.query.idUser
        if (!idUser) {
            console.log("usuario não achado")
            req.session.token = { msg: "Usuário não encontrado", type: "danger", contagem: 0 }
            return res.status(500).render("pages/template-home", {
                foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                page: "../partial/error-500",
                classePagina: "",
                token: alert,
            });
        }
        let error = validationResult(req)

        if (!error.isEmpty) {
            const jsonResult = {
                page: "../partial/template-login/esqueceuSenha",
                token: null,
                erros: error,
                idUser: idUser,
                modalAberto: true
            }
            res.render("./pages/template-login", jsonResult)
        } else {
            try {
                const { senha } = req.body
                let hashSenha = bcrypt.hashSync(senha, salt);
                var resultado = await usuariosModel.updateUser({ SENHA_USUARIO: hashSenha }, idUser)
                console.log("-------- senha redefinida -----------")
                console.log(resultado)
                req.session.token = { msg: "Senha redefinida com sucesso!", type: "success", contagem: 0 }
                res.redirect("/entrar")
            } catch (error) {
                console.log(error)
                let alert = req.session.token ? req.session.token : null;
                if (alert && alert.contagem < 1) {
                    req.session.token.contagem++;
                } else {
                    req.session.token = null;
                }
                res.status(500).render("pages/template-home", {
                    foto: req.session.autenticado ? req.session.autenticado.foto : "perfil-padrao.webp",
                    page: "../partial/error-500",
                    classePagina: "",
                    token: alert,
                });
            }
        }
    }
}




module.exports = usuariosController