import { Router } from 'express';
import { getUserProfileController } from '../controllers/user';
import authMiddleware from '../middleware/auth';
import { getUserProfileValidator } from '../validators/user';

const router = Router();

router.get(
  '/:userId',
  authMiddleware,
  getUserProfileValidator,
  getUserProfileController
);

export default router;
