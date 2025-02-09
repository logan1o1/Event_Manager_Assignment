import React from 'react';

const Card = ({ title, description, date, location, category }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-500 text-sm mb-1">
        <span className="font-semibold">Date:</span> {date}
      </p>
      <p className="text-gray-500 text-sm mb-1">
        <span className="font-semibold">Location:</span> {location}
      </p>
      <p className="text-gray-500 text-sm">
        <span className="font-semibold">Category:</span> {category}
      </p>
    </div>
  );
};

export default Card;
