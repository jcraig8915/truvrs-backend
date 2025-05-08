const {
  pushNotification,
  getNotifications,
  markAllAsRead
} = require('./notification_engine.js');

// Push notifications
console.log(pushNotification("u1", "You gained 50 XP!", "xp"));
console.log(pushNotification("u1", "Event invite: Block Party", "event"));
console.log(pushNotification("u1", "Your DAO proposal was approved.", "dao"));

// Get unread
console.log("Unread only:", getNotifications("u1", true));

// Mark all as read
console.log(markAllAsRead("u1"));

// Get all
console.log("All notifications:", getNotifications("u1"));
