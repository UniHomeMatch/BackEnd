import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";  // fs para manipulação de arquivos
import archiver from "archiver";  // Para zipar os arquivos (se permitido usar)

const tempFolder = path.resolve(__dirname, "../", "../", "uploads");
const tempUpload = path.resolve(tempFolder, "uploads");

// Configuração do multer para o upload
const upload = multer({
    storage: multer.diskStorage({
        destination: tempFolder,
        filename: (request, file, callback) => {
            const hashFile = crypto.randomBytes(10).toString("hex"); 
            const nameFile = `${hashFile}-${file.originalname}`;
            callback(null, nameFile);
        }
    })
});

// Middleware para zipar as imagens
const zipImagesMiddleware = (req, res, next) => {
    const images = req.files.images || [];
    
    if (images.length === 0) {
        return next();  // Se não há imagens, pula para o próximo middleware
    }

    const output = fs.createWriteStream(`${tempFolder}/images.zip`);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Zipped ${archive.pointer()} total bytes`);
        next();  // Prossegue para o próximo middleware ou controlador
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    images.forEach((file) => {
        archive.file(file.path, { name: file.filename });
    });

    archive.finalize();  // Finaliza o processo de zip
};

// Exporta as funções
export default {
    upload,
    zipImagesMiddleware  // Certifique-se de exportar corretamente o zipImagesMiddleware
};



// import multer from "multer";
// import crypto from "crypto";
// const path = require('path');

// const tempFolder = path.resolve(__dirname, "../", "../", "uploads");
// const tempUpload = path.resolve(tempFolder, "uploads");

// export default{
//     directory: tempFolder,
//     uploadFolder: tempUpload,
//     storage: multer.diskStorage({
//         destination:tempFolder,
//         filename: (request, file, callback) => {
//             const hashFile = crypto.randomBytes(10).toString("hex"); // gera um hash aleatório
//             const nameFile = `${hashFile}-${file.originalname}`;

//             return callback(null, nameFile);
//         }
//     })
// }