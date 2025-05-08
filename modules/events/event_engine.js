// Event Engine for TRUVRS

const events = [];

function createEvent(title, hostId, description) {
  const event = {
    id: events.length + 1,
    title,
    description,
    hostId,
    attendees: [],
    isActive: true
  };
  events.push(event);
  return event;
}

function joinEvent(eventId, userId) {
  const event = events.find(e => e.id === eventId && e.isActive);
  if (!event) return "Event not found or closed.";
  if (event.attendees.includes(userId)) return "User already joined.";
  event.attendees.push(userId);
  return {
    message: "Joined event.",
    eventId: event.id,
    userId
  };
}

function closeEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event) event.isActive = false;
  return event;
}

function getActiveEvents() {
  return events.filter(e => e.isActive);
}

module.exports = {
  createEvent,
  joinEvent,
  closeEvent,
  getActiveEvents
};
