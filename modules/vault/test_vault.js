const { writeEntry, getVault, deleteEntry } = require('./vault_engine.js');

// Create messages
console.log(writeEntry("u1", "Farewell Note", "To my future grandkids", "inheritance", "u4"));
console.log(writeEntry("u1", "Block Quote", "Live fully, love freely.", "public"));
console.log(writeEntry("u1", "Private Memory", "You and I both know why this is here.", "private"));

// Viewer attempts to read
console.log(getVault("u1", "u2")); // Should see only public
console.log(getVault("u1", "u4")); // Should see public + inheritance
console.log(getVault("u1", "u1")); // Should see all

// Delete one
const allEntries = getVault("u1", "u1");
console.log(deleteEntry("u1", allEntries[0].id));
console.log(getVault("u1", "u1"));
