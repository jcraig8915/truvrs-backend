import { Request, Response, NextFunction } from 'express';
import { authService } from '../../services/auth.service';
import { AppError } from '../../middleware/error.middleware';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      next(new AppError(401, 'Invalid credentials'));
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(new AppError(400, 'Registration failed'));
    }
  },

  async logout(req: Request, res: Response) {
    // TODO: Implement logout logic
    res.json({ message: 'Logged out successfully' });
  },

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore - user is added by auth middleware
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError(401, 'Not authenticated');
      }
      const user = await authService.getCurrentUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      next(new AppError(401, 'Invalid refresh token'));
    }
  },
}; 