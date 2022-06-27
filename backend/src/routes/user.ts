import { Router } from 'express';
import {
  getCurrentUserController,
  updateCurrentUserController,
} from '../controllers/user';
import authMiddleware from '../middleware/auth';
import { updateCurrentUserValidator } from '../validators/user';

const router = Router();

router
  .route('/')
  .get(authMiddleware, getCurrentUserController)
  .put(authMiddleware, updateCurrentUserValidator, updateCurrentUserController);

export default router;
