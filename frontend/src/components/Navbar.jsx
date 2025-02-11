import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const { authUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout");
      const data = await response.json();
      if (data.success) {
        location.reload()
        navigate("/");
        alert("Logout successful: " + data.message);
      } else {
        alert("Logout failed: " + data.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex items-center justify-between">
      {/* Left: Logo / Title */}
      <div className="text-lg font-bold">Event Platform</div>
      {/* Right: Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          onClick={() => setCurrentPage("home")}
          className={`hover:underline ${currentPage === "home" ? "underline" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          onClick={() => setCurrentPage("dashboard")}
          className={`hover:underline ${currentPage === "dashboard" ? "underline" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/eventcreation"
          onClick={() => setCurrentPage("createEvent")}
          className={`hover:underline ${currentPage === "createEvent" ? "underline" : ""}`}
        >
          Create Event
        </Link>
        {authUser ? (
          <button
            onClick={handleLogout}
            className={`hover:underline ${currentPage === "logout" ? "underline" : ""}`}
          >
            Signout
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/signup"
              onClick={() => setCurrentPage("signup")}
              className={`hover:underline ${currentPage === "signup" ? "underline" : ""}`}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              onClick={() => setCurrentPage("signin")}
              className={`hover:underline ${currentPage === "signin" ? "underline" : ""}`}
            >
              Signin
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
