import express from 'express';
import { SiteWrapper } from '../../data/interfaces/site-wrapper';
import { validateSite } from '../../middlewares/validateSite'

export const SiteRoutes = (database: SiteWrapper) => {
    const siteRoutes = express.Router();
    siteRoutes.get('/site', async (req, res) => {
        const siteList = await database.find();
        res.status(201).json({ siteList });
    });
    siteRoutes.post('/site', validateSite, async (req, res) => {
        const site = await database.create(req.body);
        res.status(201).json({ site });
    });
    siteRoutes.get('/site/:id', async (req, res) => {
        const site = await database.findById(req.params.id);
        if(!site) return res.status(404).json({ message: 'Not Found' });        
        res.status(200).json({ site });
    });
    siteRoutes.put('/site/:id',validateSite, async (req, res) => {
        const site = await database.update(req.body, req.params.id);
        res.status(200).json({ site });
    });
    siteRoutes.delete('/site/:id', async (req, res) => {
        const site = await database.remove(req.params.id);

        if(site.deletedCount === 0) return res.status(404).json({ message: 'Not Found' });
        res.status(200).json({ site});
    });

    return siteRoutes;
}