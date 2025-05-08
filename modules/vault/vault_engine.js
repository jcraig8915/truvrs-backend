// TRUVRS Vault Engine (Supabase-Backed)
// Author: TRU AI
// Version: ES Module

import { supabase } from '../../utils/supabaseClient.js';

// Create a new vault entry
export async function createEntry(userId, title, message, visibility = 'private', recipient = null) {
  const { data, error } = await supabase
    .from('vault_entries')
    .insert([{ user_id: userId, title, message, visibility, recipient }])
    .select()
    .single();

  if (error) throw new Error(`Vault create error: ${error.message}`);
  return data;
}

// Get all public entries
export async function getPublicEntries() {
  const { data, error } = await supabase
    .from('vault_entries')
    .select('*')
    .eq('visibility', 'public')
    .order('timestamp', { ascending: false });

  if (error) throw new Error(`Vault fetch error: ${error.message}`);
  return data;
}

// Get all entries for a specific user
export async function getUserEntries(userId) {
  const { data, error } = await supabase
    .from('vault_entries')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });

  if (error) throw new Error(`Vault user fetch error: ${error.message}`);
  return data;
}

// Delete an entry by ID
export async function deleteEntry(entryId) {
  const { error } = await supabase
    .from('vault_entries')
    .delete()
    .eq('id', entryId);

  if (error) throw new Error(`Vault delete error: ${error.message}`);
  return { success: true };
}
