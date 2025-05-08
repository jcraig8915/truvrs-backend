const {
  registerUserWithAge,
  getAccessProfile
} = require('./access_control_engine.js');

console.log(registerUserWithAge("u1", 8, "parent_123"));  // Child
console.log(registerUserWithAge("u2", 14));               // Teen
console.log(registerUserWithAge("u3", 22));               // Adult

console.log(getAccessProfile("u1"));
console.log(getAccessProfile("u2"));
console.log(getAccessProfile("u3"));
