// Wallet + Inventory System for TRUVRS

const wallets = new Map();

function createWallet(userId) {
  if (wallets.has(userId)) return "Wallet already exists.";
  wallets.set(userId, {
    balance: 0,
    inventory: []
  });
  return wallets.get(userId);
}

function getWallet(userId) {
  return wallets.get(userId) || "Wallet not found.";
}

function addFunds(userId, amount) {
  const wallet = wallets.get(userId);
  if (!wallet) return "Wallet not found.";
  wallet.balance += amount;
  return wallet;
}

function deductFunds(userId, amount) {
  const wallet = wallets.get(userId);
  if (!wallet) return "Wallet not found.";
  if (wallet.balance < amount) return "Insufficient funds.";
  wallet.balance -= amount;
  return wallet;
}

function addItemToWallet(userId, item) {
  const wallet = wallets.get(userId);
  if (!wallet) return "Wallet not found.";
  wallet.inventory.push(item);
  return wallet;
}

module.exports = {
  createWallet,
  getWallet,
  addFunds,
  deductFunds,
  addItemToWallet
};
