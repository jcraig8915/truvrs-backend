
// vault_engine.js – TRUVRS Vault Module
import supabase from '../../utils/supabaseClient.js';

// Create a vault entry
export async function createEntry(userId, title, message, visibility, recipient = null) {
  try {
    const { data, error } = await supabase
      .from('vaults')
      .insert([
        {
          user_id: userId,
          title,
          message,
          visibility,
          recipient,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('[Vault Insert Error]:', error);
      throw new Error('Failed to create vault entry.');
    }

    return data[0];
  } catch (err) {
    console.error('[Vault Create Exception]:', err.message);
    throw err;
  }
}

// Retrieve a vault entry by ID
export async function getEntry(id) {
  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Vault Get Error]:', error);
    throw new Error('Vault entry not found.');
  }

  return data;
}

// Get all public entries
export async function getPublicEntries() {
  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Vault Public Fetch Error]:', error);
    throw new Error('Failed to fetch public vault entries.');
  }

  return data;
}

// Get entries for a specific user
export async function getMyEntries(userId) {
  const { data, error } = await supabase
    .from('vaults')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Vault MyEntries Error]:', error);
    throw new Error('Failed to fetch user vault entries.');
  }

  return data;
}

// Delete a vault entry
export async function deleteEntry(id) {
  const { error } = await supabase
    .from('vaults')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Vault Delete Error]:', error);
    throw new Error('Failed to delete vault entry.');
  }

  return { success: true };
}
