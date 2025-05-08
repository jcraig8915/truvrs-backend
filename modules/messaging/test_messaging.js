const {
  sendMessage,
  getInbox,
  markAsRead
} = require('./messaging_engine.js');

// Send messages
console.log(sendMessage("u1", "u2", "Welcome to my Block!"));
console.log(sendMessage("u2", "u1", "Thanks for the invite!"));
console.log(sendMessage("u3", "u2", "DAO meeting at 8pm."));

// Get inbox
console.log("Inbox for u2:", getInbox("u2"));

// Mark message as read
console.log(markAsRead(1));

// Get only unread messages
console.log("Unread for u2:", getInbox("u2", true));
