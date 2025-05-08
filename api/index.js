

// Vault Entry Creation Route
app.post('/vault/create', async (req, res) => {
  try {
    const { userId, title, message, visibility = 'private', recipient = null } = req.body;

    // Validate required fields
    if (!userId || !title || !message) {
      return res.status(400).json({
        error: 'Missing required fields: userId, title, and message are required'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('vault_entries')
      .insert([{
        user_id: userId,
        title,
        message,
        visibility,
        recipient
      }])
      .select();

    // Handle Supabase errors
    if (error) {
      console.error('❌ Supabase Insert Error:', error);
      return res.status(500).json({
        error: 'Failed to create vault entry.',
        details: error.message
      });
    }

    console.log('✅ Vault entry created:', data);

    // Success response
    return res.status(201).json({
      success: true,
      message: 'Vault entry created successfully',
      data: data[0]
    });
  } catch (err) {
    console.error('❌ Unexpected Error:', err);
    return res.status(500).json({
      error: 'Unexpected error',
      details: err.message
    });
  }
});
