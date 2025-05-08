# XP Engine (TRUVRS)

Handles experience point logic for user actions.

## Functions
- `calculateXP(actionType)`: Returns XP value for action
- `applyXP(user, actionType)`: Adds XP to user object

## Triggers
- Login, voting, quest, event attendance

## Integration
Call from frontend or serverless API. XP should sync to Supabase user table via API.
