import express from 'express';
import { VolumeWrapper } from '../../data/interfaces/volume-wrapper';
import { StatusCodes } from 'http-status-codes';
import { validateVolumeFields } from '../../middlewares/validatevolumeFields'

const VolumeRoutes = (database: VolumeWrapper) => {
    const volumeRoutes = express.Router();

    volumeRoutes.get('/volumes', async (req, res) => {
        try {
            const volumeList = await database.find();
            if (!volumeList) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volumes not found' });
            }
            return res.status(StatusCodes.CREATED).json({ volumeList });
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    volumeRoutes.post('/volumes', async (req, res) => {
        try {
            const volume = await database.create(req.body);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not created' });
            }
            return res.status(StatusCodes.CREATED).json({volume});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    volumeRoutes.get('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.findById(req.params.id);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not found' });
            }
            return res.status(StatusCodes.CREATED).json({volume});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    volumeRoutes.put('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.update(req.body, req.params.id);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not updated' });
            }
            return res.status(StatusCodes.CREATED).json({volume});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    volumeRoutes.delete('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.remove(req.params.id);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not deleted' });
            }
            return res.status(StatusCodes.CREATED).json({volume});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    volumeRoutes.post('/volumes', validateVolumeFields, async (req, res) => {
        try {
            const volume = await database.create(req.body);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not created' });
            }
            return res.status(StatusCodes.CREATED).json({ volume });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    });

    volumeRoutes.put('/volumes/:id', validateVolumeFields, async (req, res) => {
        try {
            const volume = await database.update(req.body, req.params.id);
            if (!volume) {
                return res.status(StatusCodes.CREATED).json({ message: 'Volume not updated' });
            }
            return res.status(StatusCodes.CREATED).json({ volume });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
        }
    });

    return volumeRoutes;
}

export default VolumeRoutes;