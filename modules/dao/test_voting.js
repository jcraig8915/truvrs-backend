// Test Script for DAO Voting Engine
const {
  createProposal,
  castVote,
  tallyVotes,
  closeProposal
} = require('./voting_engine.js');

// Simulate: Create a proposal
const proposal = createProposal("Enable Avatar Mounts", "Allow users to ride vehicles in all city zones.", "user_1");
console.log("Proposal Created:", proposal);

// Simulate: Cast votes
console.log(castVote(proposal.id, "user_2", "yes"));
console.log(castVote(proposal.id, "user_3", "yes"));
console.log(castVote(proposal.id, "user_4", "no"));
console.log(castVote(proposal.id, "user_2", "yes")); // Duplicate vote test

// Tally votes
console.log("Tally:", tallyVotes(proposal.id));

// Close proposal
console.log("Closing Proposal...");
console.log(closeProposal(proposal.id));

// Attempt post-close vote
console.log(castVote(proposal.id, "user_5", "abstain"));
