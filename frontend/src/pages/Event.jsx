import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../context/eventContext";
import { useAuthContext } from "../context/authContext";
import { useSocket } from "../hooks/useSocket";

const Event = () => {
  const { id } = useParams();
  const { selectedEvent } = useEventContext();
  const { authUser } = useAuthContext();
  const { socket, attendeeCount } = useSocket(id);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendingLoading, setAttendingLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!selectedEvent || selectedEvent._id !== id) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          &larr; Back
        </button>
        <p>No event details available for ID: {id}</p>
      </div>
    );
  }

  const getEventById = async () => {
    try {
      setLoading(true);
      const result = await fetch(`/api/events/get/${id}`);
      const data = await result.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      console.log(data);
      setEvent(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    getEventById();
  }, [id]);

  const handleAttend = async () => {
    try {
      setAttendingLoading(true);
      const response = await fetch(`/api/events/attend/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: authUser.userId }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        setAttendingLoading(false);
        return;
      }
      await getEventById();
      if (socket) {
        // Emit updated attendee count (you may choose to use data.event.attendees.length instead)
        const updatedCount = event?.attendees?.length + 1 || 1;
        socket.emit("updateAttendeeCount", { eventId: id, count: updatedCount });
      }
      setAttendingLoading(false);
    } catch (err) {
      setError(err.message);
      setAttendingLoading(false);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-event/${event._id}`, { state: { event } });
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      if (!confirmDelete) return;
      setLoading(true);
      const response = await fetch(`/api/events/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!data.success) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const isAttending = event?.attendees?.includes(authUser.userId);

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </button>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </button>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </button>
        <p>No event data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Dashboard
      </button>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Event Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="mb-2">
            <span className="font-semibold">Date:</span> {event.date}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Location:</span> {event.location}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Category:</span> {event.category}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Attendees:</span>{" "}
            {attendeeCount || event.attendees?.length || 0}
          </div>
          <div className="mt-4">
            {authUser.userId === event.organizerId ? (
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ) : (
              isAttending ? (
                <button disabled className="bg-gray-400 text-white px-4 py-2 rounded">
                  Attending
                </button>
              ) : (
                <button
                  onClick={handleAttend}
                  disabled={attendingLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {attendingLoading ? "Processing..." : "Attend"}
                </button>
              )
            )}
          </div>
        </div>
        {/* Right Column: Poster Image */}
        <div className="flex-1">
          <img
            src={event.poster}
            alt={event.title}
            className="object-cover w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Event;
