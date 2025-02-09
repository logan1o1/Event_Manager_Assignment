import React from 'react';

const Signup = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block mb-1">Full Name</label>
          <input type="text" id="fullName" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input type="text" id="username" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input type="password" id="password" className="w-full p-2 border rounded" required minLength="6" />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select id="gender" className="w-full p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
