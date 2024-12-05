import express from 'express';
import { SiteWrapper } from '../../data/interfaces/site-wrapper';

const SiteRoutes = (database: SiteWrapper) => {
    const siteRoutes = express.Router();
    siteRoutes.get('/site', async (req, res) => {
        // Create a new user
        const siteList = await database.find();
        res.status(201).json({ siteList });
    });

    siteRoutes.get('/site', async (req, res) => {
        try {
            const siteList = await database.find();
            if (!siteList) {
                return res.status(404).json({ message: 'Not found' });

            }
            return res.status(201).json({ siteList });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })
    siteRoutes.post('/site', async (req, res) => {
        try {
            const site = await database.create(req.body);
            if (!site) {
                return res.status(404).json({ message: 'Site configuration not created' });
            }
            return res.status(201).json({site});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })
    siteRoutes.put('/site/:id', async (req, res) => {
        try {
            const site = await database.update(req.body, req.params.id);
            if (!site) {
                return res.status(404).json({ message: 'Not updated' });
            }
            return res.status(200).json({site});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })
    siteRoutes.delete('/site/:id', async (req, res) => {
        try {
            const site = await database.remove(req.params.id);
            if (!site) {
                return res.status(404).json({ message: 'Not deleted' });
            }
            return res.status(200).json({site});
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    })
    return siteRoutes;
}
export default SiteRoutes;
    



