const {
  createProposal,
  castVote,
  tallyVotes,
  closeProposal
} = require('./voting_engine.js');

// Create ban proposal
console.log(createProposal(
  "Ban User X",
  "Should we ban user u9 for violating community standards?",
  "admin_1",
  "ban",
  { targetUser: "u9", reason: "spamming porn links" }
));

// Cast votes
console.log(castVote(1, "u2", "yes"));
console.log(castVote(1, "u3", "no"));
console.log(castVote(1, "u4", "abstain"));

// Tally
console.log(tallyVotes(1));

// Close proposal
console.log(closeProposal(1));
