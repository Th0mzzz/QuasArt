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


// função para validar a proporção da imagem que está sendo passada

const validarProporcaoImagem = async (buffer, proportion, margemErro) => {
    try {
        const metadata = await sharp(buffer).metadata();
        const { width, height } = metadata;
        const imageProporcao = width / height;
        if (Math.abs(proportion - imageProporcao) > margemErro) {
            return false
        }
        return true

    } catch (err) {
        throw new Error('Erro ao processar a imagem para validação de proporção');
    }
};



module.exports = (caminho = null, tamanhoArq = 3, extensoesPermitidas = ['jpeg', 'jpg', 'png'], proportion = null, margemErro = null) => {
    return (campoArquivo) => {
        return (req, res, next) => {
            const fileFilter = createFileFilter(extensoesPermitidas);
            if (caminho == null) {
                // Salvar em SGBD
                const storage = multer.memoryStorage();
                upload = multer({
                    storage: storage,
                    limits: { fileSize: tamanhoArq * 1024 * 1024 },
                })
            } else {
                // Versão em diretório (pasta)
                // Diretório no qual está sendo armazenado
                var storagePasta = multer.diskStorage({
                    destination: (req, file, cowboy) => {
                        cowboy(null, caminho)
                    },
                    filename: (req, file, cowboy) => {
                        // função para renomear e deixar um padrão no nome dos arquivos
                        cowboy(
                            null,
                            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
                        )
                    }
                });
                // Upload
                upload = multer({
                    storage: storagePasta,
                    limits: { fileSize: tamanhoArq * 1024 * 1024 },
                    fileFilter: fileFilter
                });
            }
            req.session.erroMulter = null

            upload.single(campoArquivo)(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    req.session.erroMulter = {
                        value: '',
                        msg: err.message,
                        path: campoArquivo
                    }
                } else if (err) {
                    req.session.erroMulter = {
                        value: '',
                        msg: err.message,
                        path: campoArquivo
                    }
                } else if (req.file && caminho == null) {
                    try {
                        const isProporcaoValida = true;
                        if (proportion && margemErro) { isProporcaoValida = await validarProporcaoImagem(req.file.buffer, proportion, margemErro); }

                        if (!isProporcaoValida) {
                            req.session.erroMulter = {
                                value: '',
                                msg: 'A imagem deve seguir a proporção exigida!.',
                                path: campoArquivo
                            };
                        }
                    } catch (error) {
                        if (!isProporcaoValida) {
                            req.session.erroMulter = {
                                value: '',
                                msg: error.message,
                                path: campoArquivo
                            };
                        }
                    }
                }
                next();
            });

        }
    }
}