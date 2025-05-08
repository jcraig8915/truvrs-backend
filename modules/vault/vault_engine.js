
// TRUVRS Vault System (ESM version)
import supabase from '../../utils/supabaseClient.js';

export async function createEntry(userId, title, message, visibility, recipient = null) {
  const { data, error } = await supabase
    .from('vault_entries')
    .insert([{ user_id: userId, title, message, visibility, recipient }])
    .select()
    .single();

  if (error) throw new Error(`Create vault entry failed: ${error.message}`);
  return data;
}

export async function getPublicEntries() {
  const { data, error } = await supabase
    .from('vault_entries')
    .select('*')
    .eq('visibility', 'public');

  if (error) throw new Error(`Fetch public entries failed: ${error.message}`);
  return data;
}

export async function getMyEntries(userId) {
  const { data, error } = await supabase
    .from('vault_entries')
    .select('*')
    .or(`user_id.eq.${userId},recipient.eq.${userId}`)
    .order('timestamp', { ascending: false });

  if (error) throw new Error(`Fetch user entries failed: ${error.message}`);
  return data;
}

export async function deleteEntry(entryId) {
  const { data, error } = await supabase
    .from('vault_entries')
    .delete()
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw new Error(`Delete failed: ${error.message}`);
  return 'Entry deleted.';
}
