// Staking Engine Module for TRUVRS
// Author: TRU AI Builder Mode
// Date: Auto-generated

const stakes = [];

// Stake tokens
function stakeTokens(userId, amount) {
  if (amount <= 0) return "Invalid stake amount.";

  const stake = {
    userId,
    amount,
    timestamp: Date.now()
  };

  stakes.push(stake);
  return {
    message: "Stake successful.",
    stake
  };
}

// Calculate rewards (simple fixed % per minute)
function calculateRewards(userId) {
  const stake = stakes.find(s => s.userId === userId);
  if (!stake) return "No active stake found.";

  const minutesStaked = Math.max(1, Math.floor((Date.now() - stake.timestamp) / 1000)); // DEBUG: 1 second = 1 minute
  const rewardRate = 0.01; // 1% per minute
  const reward = stake.amount * rewardRate * minutesStaked;

  return {
    userId,
    staked: stake.amount,
    minutesStaked,
    reward: parseFloat(reward.toFixed(2))
  };
}

// Withdraw stake + rewards
function withdrawStake(userId) {
  const index = stakes.findIndex(s => s.userId === userId);
  if (index === -1) return "No active stake to withdraw.";

  const rewardData = calculateRewards(userId);
  stakes.splice(index, 1); // Remove stake

  return {
    message: "Stake withdrawn.",
    ...rewardData
  };
}

// Export functions
module.exports = {
  stakeTokens,
  calculateRewards,
  withdrawStake
};
