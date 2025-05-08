// Age Verification & Access Tier System for TRUVRS

const accessProfiles = new Map();

function registerUserWithAge(userId, age, guardianId = null) {
  let tier = "unknown";
  
  if (age < 10) {
    tier = "child";
  } else if (age >= 10 && age < 18) {
    tier = "teen";
  } else {
    tier = "adult";
  }

  accessProfiles.set(userId, {
    age,
    tier,
    guardianId,
    permissions: generatePermissions(tier)
  });

  return accessProfiles.get(userId);
}

function generatePermissions(tier) {
  switch (tier) {
    case "child":
      return ["education", "games_lite", "parent_required"];
    case "teen":
      return ["games_full", "events", "XP_gain"];
    case "adult":
      return ["full_access", "marketplace", "dao_voting", "staking"];
    default:
      return [];
  }
}

function getAccessProfile(userId) {
  return accessProfiles.get(userId) || "User not found.";
}

module.exports = {
  registerUserWithAge,
  getAccessProfile
};
