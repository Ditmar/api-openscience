import express from 'express';
import { VolumeWrapper } from '../../data/interfaces/volume-wrapper';


const VolumeRoutes = (database: VolumeWrapper) => {
    const volumeRoutes = express.Router();

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

    volumeRoutes.post('/volumes', async (req, res) => {
        try {
            const volume = await database.create(req.body);
            if (!volume) {
                return res.status(404).json({ message: 'Volume not created' });
            }
            return res.status(201).json({volume});
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
            return res.status(200).json({volume});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    volumeRoutes.put('/volumes/:id', async (req, res) => {
        try {
            const volume = await database.update(req.body, req.params.id);
            if (!volume) {
                return res.status(404).json({ message: 'Volume not updated' });
            }
            return res.status(200).json({volume});
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
            return res.status(200).json({volume});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })

    return volumeRoutes;
}

export default VolumeRoutes;