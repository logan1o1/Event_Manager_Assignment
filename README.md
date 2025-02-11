# Event Management Platform

## Overview

This project is a full-stack event management platform that allows users to create, manage, and attend events. It features user authentication, event creation and management, 
and real-time updates for event attendees using Socket.io. The UI is built with React and Tailwind CSS, and the backend uses Node.js, Express, and MongoDB (via Mongoose).

## Features

- **User Authentication:** Sign up, sign in, and sign out with JWT-based authentication.
- **Event Management:** Create, update, and delete events; view event details.
- **Real-Time Updates:** Attendee counts update in real time using Socket.io.
- **Responsive UI:** Designed with Tailwind CSS for a responsive, mobile-friendly experience.
- **Profile Management:** View events created by the user and events the user is attending.

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io
- **Authentication:** JSON Web Tokens (JWT)
- **Real-Time Communication:** Socket.io

## API Endpoints

#Authentication
- POST /api/auth/signup — Register a new user.
- POST /api/auth/signin — Authenticate a user.
- POST /api/auth/logout — Log out a user.

#Event Management
- POST /api/events/create — Create a new event.
- GET /api/events/get — Retrieve all events.
- GET /api/events/get/:id — Get event details by ID.
- POST /api/events/update/:id — Update an event (organizer only).
- DELETE /api/events/delete/:id — Delete an event (organizer only).
- POST /api/events/attend/:id — Attend an event (updates attendee list and triggers real-time updates).
