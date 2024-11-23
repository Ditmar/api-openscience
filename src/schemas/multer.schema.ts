import { FileFilterCallback } from 'multer';
import { FILE_TYPES } from '../utils/constants';

export function fileValidator(req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const fileTypes = FILE_TYPES;

    if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type (only .png, .jpg and .jpeg)'));
    }
}