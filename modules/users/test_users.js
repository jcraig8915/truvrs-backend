const {
  createUser,
  getUser,
  updateXP,
  addItem
} = require('./user_profile_engine.js');

console.log(createUser("u100", "NovaRider"));
console.log(updateXP("u100", 100));
console.log(addItem("u100", "golden_helmet"));
console.log(getUser("u100"));
