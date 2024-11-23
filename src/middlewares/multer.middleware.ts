import multer from 'multer'
import { bucket } from '../config/multerConfig'
import { fileValidator } from '../schemas/multer.schema'

export const uploadMiddleware = (maxSize: number) => {
    const storage = bucket({
        storageType: 'disk',
        bucketName: 'uploads',
    })
    return multer({
        storage,
        fileFilter: fileValidator,
        limits: {
            fileSize: maxSize
        }
    })
}