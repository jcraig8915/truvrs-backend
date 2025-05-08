const { setAccess, checkAccess } = require('./block_access_engine.js');

// Create block with strict rules
console.log(setAccess("block-101", "u1", {
  visibility: "friends_only",
  minAge: 18,
  daoRequired: true,
  allowedUsers: ["u3", "u5"]
}));

// Simulated user profiles
const user2 = { age: 17, friends: ["u1"], daoMember: false };  // underage
const user3 = { age: 25, friends: ["u1"], daoMember: true };   // full access
const user4 = { age: 22, friends: [], daoMember: true };       // not a friend
const user5 = { age: 30, friends: ["u1"], daoMember: false };  // not in DAO

console.log("User 2:", checkAccess("block-101", "u2", user2)); // ❌ underage
console.log("User 3:", checkAccess("block-101", "u3", user3)); // ✅
console.log("User 4:", checkAccess("block-101", "u4", user4)); // ❌ not friend
console.log("User 5:", checkAccess("block-101", "u5", user5)); // ❌ not in DAO
