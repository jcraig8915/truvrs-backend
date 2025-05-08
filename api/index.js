
// TRUVRS Backend API Server with Supabase Vault Logging
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'alive', timestamp: new Date().toISOString() });
});

// ===== 🔐 Vault Routes =====

app.post('/vault/create', async (req, res) => {
  const { userId, title, message, visibility = 'private', recipient = null } = req.body;

  if (!userId || !title || !message) {
    return res.status(400).json({
      error: 'Missing required fields: userId, title, and message are required.'
    });
  }

  if (!['public', 'private', 'inheritance'].includes(visibility)) {
    return res.status(400).json({
      error: 'Invalid visibility value. Must be one of: public, private, inheritance.'
    });
  }

  try {
    const { data, error } = await supabase
      .from('vault_entries')
      .insert([
        {
          user_id: userId,
          title,
          message,
          visibility,
          recipient
        }
      ])
      .select();

    if (error) {
      console.error('💥 Supabase Insert Error:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
        details: error.details
      });

      return res.status(500).json({
        error: 'Failed to create vault entry.',
        supabase: {
          code: error.code,
          message: error.message,
          hint: error.hint,
          details: error.details
        }
      });
    }

    return res.status(201).json({
      message: 'Vault entry created successfully',
      data: data[0]
    });
  } catch (err) {
    console.error('🔥 Unexpected Error:', err);
    return res.status(500).json({
      error: 'Unexpected error occurred',
      message: err.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ TRUVRS API running at http://localhost:${PORT}`);
});
