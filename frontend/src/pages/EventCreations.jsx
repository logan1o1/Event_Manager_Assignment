import React from 'react';

const EventCreations = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create an Event</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Event Title</label>
          <input type="text" id="title" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea id="description" className="w-full p-2 border rounded" required></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">Date</label>
          <input type="date" id="date" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="time" className="block mb-1">Time</label>
          <input type="time" id="time" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">Location</label>
          <input type="text" id="location" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select id="category" className="w-full p-2 border rounded" required>
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreations;
