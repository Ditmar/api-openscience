import express from 'express';
import { SiteWrapper } from '../../data/interfaces/site-wrapper';
import { StatusCodes } from 'http-status-codes';

const SiteRoutes = (database: SiteWrapper) => {
    const siteRoutes = express.Router();
    siteRoutes.get('/site/:id', async (req, res) => {
        try {
            const site = await database.findById(req.params.id);
            if (!site) {
                return res.status(StatusCodes.CREATED).json({ message: 'Not found' });
            }
            return res.status(StatusCodes.CREATED).json({site});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })
    siteRoutes.get('/site', async (req, res) => {
        try {
            const siteList = await database.find();
            if (!siteList) {
                return res.status(StatusCodes.CREATED).json({ message: 'Not found' });
            }
            return res.status(StatusCodes.CREATED).json({ siteList });
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })
    siteRoutes.post('/site', async (req, res) => {
        try {
            const site = await database.create(req.body);
            if (!site) {
                return res.status(StatusCodes.CREATED).json({ message: 'Site not created' });
            }
            return res.status(StatusCodes.CREATED).json({site});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })
    siteRoutes.put('site/:id', async (req, res) => {
        try {
            const site = await database.update(req.body, req.params.id);
            if (!site) {
                return res.status(StatusCodes.CREATED).json({ message: 'Not updated' });
            }
            return res.status(StatusCodes.CREATED).json({site});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })
    siteRoutes.delete('/site/:id', async (req, res) => {
        try {
            const site = await database.remove(req.params.id);
            if (!site) {
                return res.status(StatusCodes.CREATED).json({ message: 'Site not deleted' });
            }
            return res.status(StatusCodes.CREATED).json({site});
        } catch (error) {
            return res.status(StatusCodes.CREATED).json({ error: error });
        }
    })

    return siteRoutes;
}