// Legacy Vault System for TRUVRS

const vaults = new Map();

function writeEntry(userId, title, message, visibility = "private", recipient = null) {
  const entry = {
    id: Date.now(),
    title,
    message,
    visibility, // private, public, inheritance
    recipient,
    timestamp: new Date().toISOString()
  };

  if (!vaults.has(userId)) {
    vaults.set(userId, []);
  }

  vaults.get(userId).push(entry);
  return entry;
}

function getVault(userId, viewerId) {
  const entries = vaults.get(userId) || [];
  return entries.filter(e =>
    e.visibility === "public" ||
    (e.visibility === "inheritance" && e.recipient === viewerId) ||
    userId === viewerId
  );
}

function deleteEntry(userId, entryId) {
  const userVault = vaults.get(userId) || [];
  const updated = userVault.filter(e => e.id !== entryId);
  vaults.set(userId, updated);
  return "Entry deleted.";
}

module.exports = {
  writeEntry,
  getVault,
  deleteEntry
};
