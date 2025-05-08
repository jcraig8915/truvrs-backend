import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';

const router = Router();

// TODO: Add validation middleware
router.post('/login', validate('login'), authController.login);
router.post('/register', validate('register'), authController.register);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/refresh-token', authController.refreshToken);

export default router; 