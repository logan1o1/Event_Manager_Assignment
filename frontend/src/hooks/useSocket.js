import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export const useSocket = (eventId) => {
  const [attendeeCount, setAttendeeCount] = useState(0);

  useEffect(() => {
    socket = io('http://localhost:8000');

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
      if (eventId) {
        socket.emit('joinEvent', eventId);
      }
    });

    socket.on('attendeeCountUpdate', ({ eventId: updatedEventId, count }) => {
      if (eventId === updatedEventId) {
        setAttendeeCount(count);
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [eventId]);

  return { attendeeCount, socket };
};
