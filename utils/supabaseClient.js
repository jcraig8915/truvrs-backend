// utils/supabaseClient.js
// TRUVRS Supabase Client with embedded keys for local development

import { createClient } from '@supabase/supabase-js';

// Embedded keys for dev/test environment
const supabaseUrl = process.env.SUPABASE_URL || 'https://ppuzejoizriaklpnbztu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwdXplam9penJpYWtscG5ienR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjYzOTc0NiwiZXhwIjoyMDYyMjE1NzQ2fQ.39CSVxWqqoFVqJzUUqrgu-HFW9iq3gWvnVmDE8OQhFU';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials are missing.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
