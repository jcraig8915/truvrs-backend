# Staking Engine (TRUVRS)

Handles staking logic and reward accrual.

## Functions
- `stakeTokens(userId, amount)`
- `calculateRewards(userId)`
- `withdrawStake(userId)`

## Reward Logic
- 1% reward per simulated minute (DEBUG mode)
- Tracks stake amount + time
