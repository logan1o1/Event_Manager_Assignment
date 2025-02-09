import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center">
      <div className="text-lg font-bold">Event Platform</div>
      <div className="space-x-4">
        <Link to={"/"} onClick={() => setCurrentPage('home')} className={`hover:underline ${currentPage === 'home' && 'underline'}`}>
          Home
        </Link>
        <Link to={"/signup"} onClick={() => setCurrentPage('signup')} className={`hover:underline ${currentPage === 'signup' && 'underline'}`}>
          Signup
        </Link>
        <Link to={"/signin"} onClick={() => setCurrentPage('signin')} className={`hover:underline ${currentPage === 'signin' && 'underline'}`}>
          Signin
        </Link>
        <Link to={"/dashboard"} onClick={() => setCurrentPage('dashboard')} className={`hover:underline ${currentPage === 'dashboard' && 'underline'}`}>
          Dashboard
        </Link>
        <Link to={"/eventcreation"} onClick={() => setCurrentPage('createEvent')} className={`hover:underline ${currentPage === 'createEvent' && 'underline'}`}>
          Create Event
        </Link>
        <Link to={"/profile"} onClick={() => setCurrentPage('profile')} className={`hover:underline ${currentPage === 'profile' && 'underline'}`}>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
