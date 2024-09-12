const multer = require("multer")
const path = require("path");
const sharp = require("sharp");

// Criador de um filtro de arquivo, onde eu determino as extensoes que eu quero na hora de chamar a função

const createFileFilter = (extensoesPermitidas) => {
    return (req, file, cowboy) => {
        const extensoesRegex = new RegExp(extensoesPermitidas.join('|'));
        const extname = extensoesRegex.test(path.extname(file.originalname).toLowerCase());
        const mimetype = extensoesRegex.test(file.mimetype);

        if (extname && mimetype) {
            return cowboy(null, true);
        } else {
            return cowboy(new Error("Tipo de arquivo inválido"));
        }
    };
};


// função para validar a proporção da imagem que está sendo passada, onde eu pego as informações da 
// imagem a partir do buffer do req.file e pego sua proporção, comparando-a com a proportion exigida e vendo se está acima da margem de erro.

const validarProporcaoImagem = async (buffer, proportion, margemErro) => {
    try {
        const metadata = await sharp(buffer).metadata();
        const { width, height } = metadata;
        const imageProporcao = width / height;
        if (Math.abs(imageProporcao - proportion) > margemErro) {
            console.log("Testando proporção")
            console.log(Math.abs(imageProporcao - proportion) > margemErro)
            console.log(Math.abs(imageProporcao - proportion))
            console.log(margemErro)
            return false
        }
        return true

    } catch (err) {
        throw new Error('Erro ao processar a imagem para validação de proporção');
    }
};



module.exports = (camposConfig = []) => {
    return (req, res, next) => {
        const storageConfigs = {}
        const fileFilters = {}
        const limits = {}
        // Criação dinamica para configurações para cada campo, onde, para cada campo passado no router, ele criará uma nova config para o upload
        camposConfig.forEach(campo => {
            storageConfigs[campo.name] = multer.diskStorage({
                destination: (req, file, cowboy) => {
                    cowboy(null, campo.caminho)
                },
                filename: (req, file, cowboy) => {
                    // função para renomear e deixar um padrão no nome dos arquivos
                    cowboy(
                        null,
                        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
                    )
                }
            });
            // Assim como acima, para cada campo passado, eu crio um limite de tamanho com base no fileSize que o campo passou
            limits[campo.name] = campo.fileSize * 1024 * 1024;
            // Assim como acima, para cada campo passado, eu crio um filtro com base nas extensões que o campo passou
            fileFilters[campo.name] = createFileFilter(campo.extensoes);

        })
        // Após configurar os filtros baseados em cada campo e salva-los em um objeto, criaremos o filtro nos moldes do multer para utilizar no fileFilter do upload.
        const dynamicFileFilter = (req, file, cb) => {
            if (fileFilters[file.fieldname]) {
                return fileFilters[file.fieldname](req, file, cb);
            }
            cb(new Error("Campo não suportado: " + file.fieldname));
        };
        // Após configurar as configs do storage baseados em cada campo e salva-los em um objeto, criaremos uma config nos moldes do multer para utilizar no storage do upload para cada campo passado.
        const dynamicStorage = (req, file, cb) => {
            if (storageConfigs[file.fieldname]) {
                return cb(null, storageConfigs[file.fieldname]);
            }
            return cb(new Error("Campo não suportado: " + file.fieldname));
        }
        // Após configurar os limits com base em cada campo e salvar em um objeto, aqui verificamos se existe um limit para o campo passado no upload.fields, se sim retorna um objeto com o fileSize igual ao passado, senao, um erro.
        const dynamicLimits = (req, file, cb) => {
            const limit = limits[file.fieldname];
            if (limit) {
                cb(null, { fileSize: limit });
            } else {
                cb(new Error("Campo não suportado: " + file.fieldname));
            }
        };

        // Aqui o upload é configurado, utilizando as funções dinamicas.
        const upload = multer({
            storage: dynamicStorage,
            limits: dynamicLimits,
            fileFilter: dynamicFileFilter
        });

        // O upload fields faz a função upload(no caso o multer()) para cada campo passado aqui abaixo, ou seja, cada campo do camposConfig, passando as config para as configs do multer.
        upload.fields(camposConfig.map(campo =>
        ({
            name: campo.name,
            maxCount: campo.maxCount || 1
        })))// aqui acaba a função de config os campos para o upload.fields e começa o tratamento para erros ou prosseguir o middlewares
            (req, res, function (err) {
                // Tratamento de erros de upload

                // Se existir um erro do multer ou um err, ele vai passar por todos os campos e verificar se o name deles é igual ao do erro, se sim, ele adiciona um erro ao errosMulter.
                if (err instanceof multer.MulterError || err) {
                    // Adiciona erros de todos os campos
                    camposConfig.forEach(campo => {
                        if (err.field === campo.name) {
                            errosMulter.push({
                                value: '',
                                msg: err.message,
                                path: campo.name
                            });
                        }
                    });
                    // verifica se existe a variavel de sessão de erros do multer, senao, então cria.
                    if (!req.session.erroMulter) {
                        req.session.erroMulter = [];
                    }
                    // aqui ele pega os erros que ja tinham da variavel e adiciona os erros do array, descontruindo ambos e colocando num novo array

                    req.session.erroMulter = [...req.session.erroMulter, ...errosMulter];
                    return next();
                }
                next();
            });


    }

}
