import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";  
import archiver from "archiver";  
import { profile } from "console";

const tempFolder = path.resolve(__dirname, "../", "../", "uploads");

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
    const images = req.files && req.files.images ? req.files.images : [];
    const thumb = req.files && req.files.thumb ? req.files.thumb[0] : null;
    const profileImg = req.files && req.files.profileImg ? req.files.profileImg[0] : null; // Novo campo de imagem para o usuário

    if (images.length === 0 && !thumb && !profileImg) {  // Correção de userImage para profileImg
        return next();  // Se não há imagens, thumb, ou profileImg, pula para o próximo middleware
    }
    

    const output = fs.createWriteStream(path.join(tempFolder, 'images.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Zipped ${archive.pointer()} total bytes`);
        next();  // Prossegue para o próximo middleware ou controlador
    });

    archive.on('error', (err) => {
        console.error('Error during archiving:', err);
        return next(err); // Passa o erro para o middleware de erro
    });

    archive.pipe(output);

    images.forEach((file) => {
        archive.file(file.path, { name: file.filename });
    });

    if (thumb) {
        archive.file(thumb.path, { name: thumb.filename });
    }

    if (profileImg) {
        archive.file(profileImg.path, { name: profileImg.filename }); // Adiciona a imagem do usuário
    }

    archive.finalize();  // Finaliza o processo de zip
};

// Exporta as funções
export default {
    upload,
    zipImagesMiddleware  
};
