import { Router } from 'express';
import { getCurrentUserController } from '../controllers/user';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getCurrentUserController);

export default router;
