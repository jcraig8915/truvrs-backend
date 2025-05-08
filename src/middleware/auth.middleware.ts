import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { AppError } from './error.middleware';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(401, 'No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AppError(401, 'No token provided');
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new AppError(401, 'Invalid or expired token');
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}; 