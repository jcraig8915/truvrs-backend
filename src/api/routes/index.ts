import { Router } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import worldsRoutes from './worlds.routes';
import assetsRoutes from './assets.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/worlds', worldsRoutes);
router.use('/assets', assetsRoutes);

export default router; 