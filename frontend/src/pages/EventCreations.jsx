import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useEventContext } from "../context/eventContext";

const EventCreations = () => {
  const [formData, setFormData] = useState({});
  const { triggerEventsChange } = useEventContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState("")
  const { authUser } = useAuthContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlefileUplode = async (e) => {
    const file = e.target.files[0]
    if(!file) return

    setLoading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'event_manager')
    data.append('cloud_name', 'dxf7nv9mt')

    const result = await fetch("https://api.cloudinary.com/v1_1/dxf7nv9mt/image/upload", {
      method: "POST",
      body: data
    })
    const uploadImgUrl = await result.json()
    setLoading(false)
    setImgUrl(uploadImgUrl.url)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await fetch("/api/events/create", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          organizerId: authUser.userId,
          poster: imgUrl
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      triggerEventsChange();
      setFormData({})
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Event Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            onChange={handleChange}
            id="description"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">
            Date
          </label>
          <input
            onChange={handleChange}
            type="date"
            id="date"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block mb-1">
            Time
          </label>
          <input
            onChange={handleChange}
            type="time"
            id="time"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">
            Location
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="location"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <select
            onChange={handleChange}
            id="category"
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div>
          <label htmlFor="poster" className="block mb-1">
            Poster Image
          </label>
          <input
            onChange={handlefileUplode}
            type="file"
            id="poster"
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          {loading ? "Uploading..." : ""}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "loading..." : "Create Event"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {error == null ? (
        <></>
      ) : (
        !error && (
          <p className="text-green-600">{"Event successfully created"}</p>
        )
      )}
    </div>
  );
};

export default EventCreations;
