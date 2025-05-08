// Marketplace Engine for TRUVRS
const listings = [];
const { getUser, addItem } = require('../users/user_profile_engine.js');

// List item for sale
function listItem(sellerId, itemName, price) {
  const listing = {
    id: listings.length + 1,
    sellerId,
    itemName,
    price,
    isSold: false
  };
  listings.push(listing);
  return listing;
}

// Buy item
function buyItem(buyerId, listingId) {
  const listing = listings.find(l => l.id === listingId && !l.isSold);
  if (!listing) return "Item not available.";
  
  listing.isSold = true;
  addItem(buyerId, listing.itemName);
  return {
    message: "Purchase successful.",
    item: listing.itemName,
    from: listing.sellerId,
    to: buyerId
  };
}

// Get active listings
function getListings() {
  return listings.filter(l => !l.isSold);
}

module.exports = {
  listItem,
  buyItem,
  getListings
};
