import { Router } from 'express';
import { addUserController } from '../controllers/users';
import addUserValidator from '../validators/users';

const router = Router();

router.post('/', addUserValidator, addUserController);

export default router;
