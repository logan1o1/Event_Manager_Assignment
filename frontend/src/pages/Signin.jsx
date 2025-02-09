import React from 'react';

const Signin = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signin</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input type="text" id="username" className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input type="password" id="password" className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
