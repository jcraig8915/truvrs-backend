// XP Engine Module for TRUVRS
// Author: TRU AI Builder Mode
// Date: Auto-generated

// Define base XP values for actions
const xpValues = {
  login: 10,
  completeQuest: 50,
  vote: 25,
  attendEvent: 40
};

// Calculate XP based on action
function calculateXP(actionType) {
  return xpValues[actionType] || 0;
}

// Apply XP to user
function applyXP(user, actionType) {
  const xpGain = calculateXP(actionType);
  user.xp = (user.xp || 0) + xpGain;
  return {
    username: user.username,
    newXP: user.xp,
    gained: xpGain
  };
}

// Export functions
module.exports = {
  calculateXP,
  applyXP
};
