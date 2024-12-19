import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.post('/change-password', UserController.changePassword);

export default router;