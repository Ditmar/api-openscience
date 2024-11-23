import express from 'express';
//import { uploadMiddleware } from '../../middlewares/multer.middleware';
const ImageRouter = () => {
    const imageRouter = express.Router();
    //const uploader = uploadMiddleware(1024 * 1024 * 8); // 8MB
    imageRouter.get('/bucket', (req, res) => {
        res.status(200).json({ message: 'GET /bucket' });
        
    });

    imageRouter.post(
        '/bucket',
        //uploader.single('image'), // Middleware para manejar la imagen
        (req, res) => {
            //console.log(req.file);

            if (!req.file) {
                return res.status(400).json({ error: 'No se subió ninguna imagen.' });
            }

            res.status(201).json({
                message: 'Imagen cargada exitosamente.',
                filePath: `/uploads/${req.file.filename}`,
            });
        }
    );
    return imageRouter;
}

export default ImageRouter;