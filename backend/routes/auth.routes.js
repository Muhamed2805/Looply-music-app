import { Router } from 'express';
import {registerUserHandler, loginUserHandler, refreshTokenHandler} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler);
router.post('/refresh', refreshTokenHandler);

export default router;
