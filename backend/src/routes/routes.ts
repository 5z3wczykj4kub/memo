import { Router } from 'express';
import auth from './auth';
import user from './user';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/me', user);
router.use('/users', users);

export default router;
