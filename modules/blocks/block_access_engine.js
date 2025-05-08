// Block Access Control Engine for TRUVRS

const blockRules = new Map();

// Set access rules for a Block
function setAccess(blockId, ownerId, options = {}) {
  const defaultOptions = {
    visibility: "private",         // public, private, friends_only
    allowedUsers: [],              // whitelist
    minAge: null,                  // restrict underage
    daoRequired: false             // DAO members only
  };

  const rule = {
    blockId,
    ownerId,
    ...defaultOptions,
    ...options
  };

  blockRules.set(blockId, rule);
  return rule;
}

// Check if user has access
function checkAccess(blockId, userId, userProfile = {}) {
  const rule = blockRules.get(blockId);
  if (!rule) return "Block not found.";

  const {
    visibility,
    allowedUsers,
    minAge,
    daoRequired
  } = rule;

  // Blocked by visibility
  if (visibility === "private" && userId !== rule.ownerId) return "Access denied: private block.";
  if (visibility === "friends_only" && !(userProfile.friends || []).includes(rule.ownerId)) return "Access denied: not a friend.";

  // Age restriction
  if (minAge !== null && (userProfile.age || 0) < minAge) return "Access denied: age restricted.";

  // DAO membership
  if (daoRequired && !userProfile.daoMember) return "Access denied: DAO members only.";

  // Whitelist
  if (allowedUsers.length && !allowedUsers.includes(userId)) return "Access denied: not whitelisted.";

  return "Access granted.";
}

module.exports = {
  setAccess,
  checkAccess
};
