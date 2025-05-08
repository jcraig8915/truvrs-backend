import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

export const environment = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Supabase
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-default-jwt-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // CORS
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
  
  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  
  // File Upload
  maxFileSize: process.env.MAX_FILE_SIZE || '50mb',
  
  // Feature Flags
  features: {
    enableRegistration: process.env.ENABLE_REGISTRATION !== 'false',
    enablePasswordReset: process.env.ENABLE_PASSWORD_RESET !== 'false',
    enableSocialAuth: process.env.ENABLE_SOCIAL_AUTH === 'true',
  },
} as const; 