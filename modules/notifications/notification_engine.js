// TRUVRS Notification Engine

const notifications = new Map();

// Push notification to user
function pushNotification(userId, message, type = "general") {
  const note = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false
  };

  if (!notifications.has(userId)) {
    notifications.set(userId, []);
  }

  notifications.get(userId).push(note);
  return note;
}

// Get all notifications (optionally unread only)
function getNotifications(userId, unreadOnly = false) {
  const userNotes = notifications.get(userId) || [];
  return unreadOnly ? userNotes.filter(n => !n.read) : userNotes;
}

// Mark all as read
function markAllAsRead(userId) {
  const userNotes = notifications.get(userId) || [];
  userNotes.forEach(n => n.read = true);
  return `${userNotes.length} notifications marked as read.`;
}

module.exports = {
  pushNotification,
  getNotifications,
  markAllAsRead
};
