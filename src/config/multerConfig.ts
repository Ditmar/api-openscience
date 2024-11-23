import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface MulterConfigProps {
    storageType: 'disk' | 'memory';
    bucketName: string;
}

export function bucket({ storageType, bucketName }: MulterConfigProps) {
    switch (storageType) {
        case 'disk':
            return multer.diskStorage({
                destination: (req, file, cb) => {
                    const folderPath = path.join(__dirname, `../../${bucketName}`);
                    ensureFolderExists(folderPath);
                    cb(null, folderPath);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                    const extencion = path.extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extencion}`);
                }
            })
        case 'memory':
            return multer.memoryStorage();
    }
}

const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};