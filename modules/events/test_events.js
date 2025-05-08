const { createEvent, joinEvent, closeEvent, getActiveEvents } = require('./event_engine.js');

// Host creates an event
console.log(createEvent("TRU Block Party", "u1", "Launch celebration at Nova Square"));

// Users join
console.log(joinEvent(1, "u2"));
console.log(joinEvent(1, "u3"));

// Check events
console.log(getActiveEvents());

// Close the event
console.log(closeEvent(1));

// Try joining after closed
console.log(joinEvent(1, "u4"));
