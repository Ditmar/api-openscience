import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { uploadMiddleware } from '../../middlewares/multer.middleware';
import { createDataURL } from '../../utils/createUrl';
import { MAX_FILE_SIZE } from '../../utils/constants';
const ImageRouter = () => {
    const router = express.Router();

    const uploader = uploadMiddleware(MAX_FILE_SIZE); // 8MB
    router.get('/upload', (req, res) => {
        res.status(StatusCodes.OK).json({ message: 'GET /bucket' });
    });

    router.post(
        '/upload',
        uploader.single('image'),
        (req, res) => {
            if (!req.file) {
                return res.status(StatusCodes.BAD_REQUEST).json({ 
                    error: 'No image has been uploaded.' 
                });
            }
            const url = createDataURL(req.file);

            res.status(StatusCodes.CREATED).json({
                message: 'Image uploaded successfully.',
                filePath: `/uploads/${req.file.filename}`,
                url,
            });
        }
    );
    return router;
}

export default ImageRouter;