// TRUVRS In-App Messaging Engine

const messages = [];

function sendMessage(fromUser, toUser, content) {
  const msg = {
    id: messages.length + 1,
    from: fromUser,
    to: toUser,
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  messages.push(msg);
  return msg;
}

function getInbox(userId, unreadOnly = false) {
  const inbox = messages.filter(m => m.to === userId);
  return unreadOnly ? inbox.filter(m => !m.read) : inbox;
}

function markAsRead(messageId) {
  const msg = messages.find(m => m.id === messageId);
  if (msg) msg.read = true;
  return msg || "Message not found.";
}

module.exports = {
  sendMessage,
  getInbox,
  markAsRead
};
