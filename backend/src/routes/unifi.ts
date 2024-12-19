import { Router } from 'express';
import { SiteController } from '../controllers/site.controller';
import { authenticateToken, requireAdmin } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/sites', SiteController.getSites);
router.get('/sites/:id', SiteController.getSiteDetails);
router.post('/sites/sync', SiteController.syncSites);

export default router;