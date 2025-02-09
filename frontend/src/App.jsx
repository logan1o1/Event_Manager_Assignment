import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import EventCreations from './pages/EventCreations';
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar/>
        <Routes className="flex-grow container mx-auto p-4">
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/eventcreation' element={<EventCreations/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
