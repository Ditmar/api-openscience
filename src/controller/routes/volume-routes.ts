import express from 'express';
import { VolumeWrapper } from '../../data/interfaces/volume-wrapper';
import { schemaValidationMiddleware } from '../../middlewares/schemaValidator.middleware';
import { volumeWrapperPostSchema, volumeWrapperPutSchema } from '../../schemas/volume.schema';
import { uploadMiddleware } from '../../middlewares/multer.middleware';
import { MAX_FILE_SIZE } from '../../utils/constants';
import { VolumeModel } from '../../data/interfaces/volume-model';

import { createDataURL } from '../../utils/createUrl';


const VolumeRoutes = (database: VolumeWrapper) => {
    const volumeRoutes = express.Router();
    const uploader = uploadMiddleware(MAX_FILE_SIZE); // 8MB

    volumeRoutes.get('/volumes', async (req, res) => {
        try {
            const volumeList = await database.find();
            if (!volumeList) {
                return res.status(404).json({ message: 'Volumes not found' });
            }
            return res.status(201).json({ volumeList });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    volumeRoutes.post('/volumes', uploader.single('file'), schemaValidationMiddleware(volumeWrapperPostSchema), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No se subió ninguna imagen.' });
            }
            const { title, article, year_volume } = req.body;
            const file = req.file;
            const dataURL = createDataURL(file);
            const volumeData = {
                title,
                article,
                year_volume,
                date: new Date(),
                portrait: dataURL,
            } as VolumeModel;
            const volume = await database.create(volumeData);
            if (!volume) {
                return res.status(404).json({
                    message: 'Volume not created'
                });
            }
            return res.status(201).json({
                volume,
                imageMessage: 'Imagen cargada exitosamente.',
                filePath: `/uploads/${req.file.filename}`,
            });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    volumeRoutes.get('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.findById(req.params.id);
            if (!volume) {
                return res.status(404).json({ message: 'Volume not found' });
            }
            return res.status(200).json({ volume });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    volumeRoutes.put('/volumes/:id', schemaValidationMiddleware(volumeWrapperPutSchema), async (req, res) => {
        try {
            const volume = await database.update(req.body, req.params.id);
            if (!volume) {
                return res.status(404).json({ message: 'Volume not updated' });
            }
            return res.status(200).json({ volume });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    volumeRoutes.delete('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.remove(req.params.id);
            if (!volume) {
                return res.status(404).json({ message: 'Volume not deleted' });
            }
            return res.status(200).json({ volume });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    return volumeRoutes;
}

export default VolumeRoutes;