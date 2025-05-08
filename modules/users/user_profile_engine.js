// User Profile Engine for TRUVRS
// Author: TRU AI Builder Mode
// Date: Auto-generated

const users = new Map();

// Create a new user profile
function createUser(userId, username) {
  if (users.has(userId)) return "User already exists.";

  const user = {
    userId,
    username,
    avatar: "default.png",
    xp: 0,
    inventory: [],
    status: "active"
  };

  users.set(userId, user);
  return user;
}

// Get user profile
function getUser(userId) {
  return users.get(userId) || "User not found.";
}

// Update XP
function updateXP(userId, xp) {
  const user = users.get(userId);
  if (!user) return "User not found.";
  user.xp += xp;
  return user;
}

// Add item to inventory
function addItem(userId, item) {
  const user = users.get(userId);
  if (!user) return "User not found.";
  user.inventory.push(item);
  return user;
}

// Export
module.exports = {
  createUser,
  getUser,
  updateXP,
  addItem
};
