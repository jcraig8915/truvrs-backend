import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { AppError } from '../middleware/error.middleware';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AppError(401, error.message);
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  async register(userData: { email: string; password: string; name: string }) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
        },
      },
    });

    if (error) {
      throw new AppError(400, error.message);
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  async getCurrentUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new AppError(404, 'User not found');
    }

    return data;
  },

  async refreshToken(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new AppError(401, error.message);
    }

    return {
      session: data.session,
    };
  },
}; 