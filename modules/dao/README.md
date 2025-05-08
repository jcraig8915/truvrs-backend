# DAO Voting Engine (TRUVRS)

Handles proposal creation and voting.

## Functions
- `createProposal(title, description, createdBy)`
- `castVote(proposalId, userId, voteType)`
- `tallyVotes(proposalId)`
- `closeProposal(proposalId)`

## Rules
- One vote per user
- Open/closed status control
- Tracks `yes`, `no`, `abstain`
