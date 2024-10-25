import { Router, Request, Response } from 'express';
import { SeoService } from '../../provider/seo-service';
import { SeoConfiguration } from '../../data/interfaces/seo-configuration';

const router = Router();
const seoService = new SeoService();

// GET /seoConfigurations
router.get('/seoConfigurations', (req: Request, res: Response) => {
  const configs = seoService.getAllSeoConfigurations();
  res.json(configs);
});

// GET /seoConfigurations/:id
router.get('/seoConfigurations/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const config = seoService.getSeoConfigurationById(id);
  if (config) {
    res.json(config);
  } else {
    res.status(404).json({ message: 'Configuration not found' });
  }
});

// POST /seoConfigurations
router.post('/seoConfigurations', (req: Request, res: Response) => {
  const config: SeoConfiguration = req.body;
  const newConfig = seoService.createSeoConfiguration(config);
  res.status(201).json(newConfig);
});

// PUT /seoConfigurations/:id
router.put('/seoConfigurations/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedConfig: SeoConfiguration = req.body;
  const result = seoService.updateSeoConfiguration(id, updatedConfig);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Configuration not found' });
  }
});

// DELETE /seoConfigurations/:id
router.delete('/seoConfigurations/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = seoService.deleteSeoConfiguration(id);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Configuration not found' });
  }
});

export default router;
