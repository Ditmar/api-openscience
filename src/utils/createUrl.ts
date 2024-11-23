import fs from 'fs';

export function createDataURL(file: Express.Multer.File) {
    const pathImg = file.path;
    const mimeType = file.mimetype;
    const encodeImg = fs.readFileSync(pathImg, 'base64');
    const imageBuffer = new Buffer(encodeImg, 'base64');
    return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
}