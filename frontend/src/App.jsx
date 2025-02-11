import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import EventCreations from "./pages/EventCreations";
import Navbar from "./components/Navbar";
import { EventProvider } from "./context/eventContext";
import Event from "./pages/Event";
import UpdateEvent from "./pages/UpdateEvent";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <EventProvider>
        <Navbar />
        <Routes className="flex-grow container mx-auto p-4">
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventcreation" element={<EventCreations />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path='/event/:id' element={<Event />} />
        </Routes>
      </EventProvider>
    </div>
  );
}

export default App;
