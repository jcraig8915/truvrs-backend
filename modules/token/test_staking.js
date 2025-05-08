// Test Script for TRU Staking Engine
const {
  stakeTokens,
  calculateRewards,
  withdrawStake
} = require('./staking_engine.js');

// Step 1: Stake 100 tokens
const stakeResult = stakeTokens("user_42", 100);
console.log("Stake Result:", stakeResult);

// Step 2: Simulate time passing (wait 3 seconds = pretend 3 minutes)
setTimeout(() => {
  // Step 3: Calculate Rewards
  const rewards = calculateRewards("user_42");
  console.log("Rewards After Wait:", rewards);

  // Step 4: Withdraw Stake
  const withdrawal = withdrawStake("user_42");
  console.log("Withdrawal:", withdrawal);
}, 3000);
