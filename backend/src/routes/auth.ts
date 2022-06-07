import { Router } from 'express';
import {
  getCurrentUserController,
  signInController,
  signUpController,
} from '../controllers/auth';
import authMiddleware from '../middleware/auth';
import { signInValidator, signUpValidator } from '../validators/auth';

const router = Router();

router.post('/signup', signUpValidator, signUpController);
router.post('/signin', signInValidator, signInController);
router.get('/me', authMiddleware, getCurrentUserController);

export default router;
