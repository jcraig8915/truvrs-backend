// DAO Voting Engine Module for TRUVRS
// Author: TRU AI Builder Mode
// Date: Auto-generated

const proposals = [];

function createProposal(title, description, createdBy, type = "general", payload = {}) {
  const id = proposals.length + 1;
  const proposal = {
    id,
    title,
    description,
    createdBy,
    type, // general, budget, ban, reward, update
    payload, // can hold structured data
    votes: {
      yes: 0,
      no: 0,
      abstain: 0
    },
    voters: new Set(),
    status: "open"
  };
  proposals.push(proposal);
  return proposal;
}

// Cast a vote
function castVote(proposalId, userId, voteType) {
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal || proposal.status !== "open") return "Voting closed or proposal not found.";
  if (proposal.voters.has(userId)) return "User already voted.";

  if (voteType in proposal.votes) {
    proposal.votes[voteType]++;
    proposal.voters.add(userId);
    return "Vote cast successfully.";
  } else {
    return "Invalid vote type.";
  }
}

// Tally results
function tallyVotes(proposalId) {
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return null;
  return proposal.votes;
}

// Close proposal
function closeProposal(proposalId) {
  const proposal = proposals.find(p => p.id === proposalId);
  if (proposal) proposal.status = "closed";
  return proposal;
}

// Export
module.exports = {
  createProposal,
  castVote,
  tallyVotes,
  closeProposal
};
