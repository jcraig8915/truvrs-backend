// vault_engine.js
import supabase from '../../utils/supabaseClient.js';

// Create a vault entry
export async function createEntry(userId, title, message, visibility = 'private', recipient = null) {
  const { data, error } = await supabase
    .from('vaults')
    .insert([
      {
        user_id: userId,
        title,
        message,
        visibility,
        recipient
      }
    ]);

  if (error) throw new Error(error.message);
  return data[0];
}

// Get all public entries
export async function getPublicEntries() {
  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Get entries by user
export async function getMyEntries(userId) {
  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Delete an entry by ID
export async function deleteEntry(id) {
  const { data, error } = await supabase
    .from('vaults')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return data;
}
