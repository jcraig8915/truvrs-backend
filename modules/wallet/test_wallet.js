const {
  createWallet,
  getWallet,
  addFunds,
  deductFunds,
  addItemToWallet
} = require('./wallet_engine.js');

// Create wallet
console.log(createWallet("u1"));

// Add funds
console.log(addFunds("u1", 500));

// Deduct funds
console.log(deductFunds("u1", 150));

// Add item
console.log(addItemToWallet("u1", "dark_cloak"));

// View wallet
console.log(getWallet("u1"));
