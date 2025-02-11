import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/eventContext";
import { useAuthContext } from "../context/authContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { eventsChanged, setSelectedEvent } = useEventContext();
  const { authUser } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const getEvents = async () => {
    try {
      setLoading(true);
      const result = await fetch("/api/events/get");
      const data = await result.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setEvents(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching events");
    }
  };

  useEffect(() => {
    getEvents();
  }, [eventsChanged]);

  const filteredEvents = events.filter((event) => {
    return (
      (categoryFilter ? event.category === categoryFilter : true) &&
      (dateFilter ? event.date === dateFilter : true)
    );
  });

  const userId = authUser?.userId;

  const appliedEvents = filteredEvents.filter(
    (event) =>
      event.organizerId !== userId &&
      event.attendees &&
      event.attendees.includes(userId)
  );

  const createdEvents = filteredEvents.filter(
    (event) => event.organizerId === userId
  );

  const otherEvents = filteredEvents.filter(
    (event) =>
      event.organizerId !== userId &&
      (!event.attendees || !event.attendees.includes(userId))
  );

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    navigate(`/event/${event._id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Event Dashboard</h2>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Education">Education</option>
          <option value="Sports">Sports</option>
          <option value="Business">Business</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">My Events</h3>
            {appliedEvents.length === 0 ? (
              <p>No events you have applied to.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appliedEvents.map((event) => (
                  <Card
                    key={event._id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    category={event.category}
                    onClick={() => handleCardClick(event)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Created Events</h3>
            {createdEvents.length === 0 ? (
              <p>You haven't created any events.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {createdEvents.map((event) => (
                  <Card
                    key={event._id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    category={event.category}
                    onClick={() => handleCardClick(event)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Other Events</h3>
            {otherEvents.length === 0 ? (
              <p>No other events available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherEvents.map((event) => (
                  <Card
                    key={event._id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    category={event.category}
                    onClick={() => handleCardClick(event)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Dashboard;
