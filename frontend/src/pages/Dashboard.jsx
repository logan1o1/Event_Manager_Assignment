import React, { useState } from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Dummy data for demonstration
  const events = [
    {
      id: 1,
      title: 'Tech Meetup',
      description: 'An event for tech enthusiasts.',
      date: '2025-02-15',
      location: 'Online',
      category: 'Tech',
    },
    {
      id: 2,
      title: 'Music Fest',
      description: 'Enjoy live music.',
      date: '2025-03-01',
      location: 'City Park',
      category: 'Music',
    },
    // Add additional dummy events as needed
  ];

  const filteredEvents = events.filter((event) => {
    return (
      (categoryFilter ? event.category === categoryFilter : true) &&
      (dateFilter ? event.date === dateFilter : true)
    );
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            category={event.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
