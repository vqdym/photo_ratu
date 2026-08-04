import express from 'express';
import { login, signupAdmin } from '../controllers/authController';

const router = express.Router();

router.route('/login').post(login);
router.route('/signupAdminOnly').post(signupAdmin);

export default router;
