const multer = require("multer")
const path = require("path")

const createFileFilter = (extensoesPermitidas) => {
    return (req, file, cowboy) => {
        const extensoesRegex = new RegExp(extensoesPermitidas.join('|'));
        const extname = extensoesRegex.test(path.extname(file.originalname).toLowerCase());
        const mimetype = extensoesRegex.test(file.mimetype);

        if (extname && mimetype) {
            return cowboy(null, true);
        } else {
            cowboy(new Error("Tipo de arquivo inválido"));
        }
    };
};



module.exports = (caminho = null, tamanhoArq = 3, extensoesPermitidas = ['jpeg', 'jpg', 'png']) => {
    const fileFilter = createFileFilter(extensoesPermitidas);
    // Salvar em SGBD
    if (caminho == null) {
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

    return (campoArquivo) => {

        return (req, res, next) => {
            req.session.erroMulter = null
            upload.single(campoArquivo)(req, res, function (err) {
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
                }
                next();
            });

        }
    }
}