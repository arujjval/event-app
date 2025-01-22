import express from 'express';
import { signIn, login, getUsers } from '../controllers/userController';

const router = express.Router();

router.post('/sign-in', signIn);
router.get('/get-users', getUsers);
router.post('/login', login);

export default router;
