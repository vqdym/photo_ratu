import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.route('/login').post(login);
// router.route('/signupAdminOnly').post(signupAdmin);
// router.route('/deleteAllAdmins').delete(deleteAdmin);
export default router;
