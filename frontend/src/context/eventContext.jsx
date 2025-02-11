import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsChanged, setEventsChanged] = useState(0);

  const triggerEventsChange = () => {
    setEventsChanged(prev => prev + 1);
  };

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        eventsChanged,
        triggerEventsChange,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
