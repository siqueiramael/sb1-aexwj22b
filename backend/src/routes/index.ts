import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import adminRoutes from './admin';
import unifiRoutes from './unifi';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/unifi', unifiRoutes);

export default router;