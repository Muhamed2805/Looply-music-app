import { Router } from 'express';
import verifyToken from '../utils/verifyToken.js';

const router = Router();

router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Autorizovan pristup!', user: req.user });
});

export default router;
