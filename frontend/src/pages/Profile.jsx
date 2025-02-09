import React from 'react';
import Card from '../components/Card';

const Profile = () => {
  // Dummy user events for demonstration
  const userEvents = [
    {
      id: 1,
      title: "User's Tech Meetup",
      description: 'My organized tech event.',
      date: '2025-02-20',
      location: 'Online',
      category: 'Tech',
    },
    // Add more events as needed
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <h3 className="text-xl mb-2">My Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userEvents.map((event) => (
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

export default Profile;
