import React from 'react';
import { useSocket } from '../hooks/useSocket';

const AttendeeCount = ({ eventId, initialCount = 0 }) => {
  const { attendeeCount } = useSocket(eventId);

  return (
    <div className="p-2 bg-gray-100 rounded text-center">
      <p className="text-sm">
        Attendees: <span className="font-bold">{attendeeCount || initialCount}</span>
      </p>
    </div>
  );
};

export default AttendeeCount;
