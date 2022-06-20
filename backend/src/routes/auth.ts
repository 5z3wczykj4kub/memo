import { Router } from 'express';
import { signInController, signUpController } from '../controllers/auth';
import { signInValidator, signUpValidator } from '../validators/auth';

const router = Router();

router.post('/sign-up', signUpValidator, signUpController);
router.post('/sign-in', signInValidator, signInController);

export default router;
