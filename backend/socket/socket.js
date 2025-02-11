import { Server } from 'socket.io';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // client joins an event
    socket.on('joinEvent', (eventId) => {
      socket.join(eventId);
      console.log(`Socket ${socket.id} joined event room: ${eventId}`);
    });

    // Listen for attendee count updates after attendee is added
    // socket.on('updateAttendeeCount', ({ eventId, count }) => {
    //   // Broadcast the updated count
    //   io.to(eventId).emit('attendeeCountUpdate', { eventId, count });
    //   console.log(`Updated attendee count for event ${eventId}: ${count}`);
    // });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export default setupSocket;