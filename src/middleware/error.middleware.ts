import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    logger.error(`[${error.statusCode}] ${error.message}`);
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  // Unhandled errors
  logger.error(`[500] ${error.message}`);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}; 