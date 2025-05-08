const { createUser } = require('../users/user_profile_engine.js');
const { listItem, buyItem, getListings } = require('./marketplace_engine.js');

// Setup users
createUser("u1", "SellerGuy");
createUser("u2", "BuyerGirl");

// Seller lists item
console.log(listItem("u1", "dragon_blade", 150));

// View listings
console.log(getListings());

// Buyer purchases item
console.log(buyItem("u2", 1));

// Check listings again
console.log(getListings());
