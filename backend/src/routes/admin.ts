import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateToken, requireAdmin } from '../middlewares/auth';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.post('/users', AdminController.createUser);
router.post('/users/import', upload.single('file'), AdminController.importUsers);
router.get('/users', AdminController.getUsers);
router.delete('/users/:id', AdminController.deleteUser);

export default router;