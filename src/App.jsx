import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account.jsx"
import Dashboard from "./pages/Dashboard"
import Inspiration from "./pages/Inspiration"
import Login from "./pages/Login"
import Planner from "./pages/Planner"
import PublicFeed from "./pages/PublicFeed"
import PublicTripDetails from './pages/PublicTripDetails.jsx';
import Register from "./pages/Register"
import TaskPage from "./pages/TaskPage"
import MyTrips from "./pages/MyTrips"
import TripDetails from "./pages/TripDetails"
import NavBar from './components/NavBar';
import Events from './components/Events.jsx';
import ManageMembers from "./pages/ManageMembers.jsx";
import EventDetails from './components/EventDetails.jsx';
import './App.css'

function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <>
      <div>
        <NavBar token={token} setToken={setToken} setUserId={setUserId} userId={userId} />
      </div>

      <Routes>
        <Route path="/trip/:tripId/events" element={<Events token={token}/>} />
        <Route path='/trip/events/:id' element={<EventDetails token={token}/>} />
        <Route path="/trip/public" element={<PublicFeed/>} />
        <Route path="/trip/public/:id" element={<PublicTripDetails token={token}/>} />
        <Route path="/inspiration" element={<Inspiration/>} />
        <Route path="/trip/new" element={<Planner token={token}/>} />
        <Route path="/trip/user/:id" element={<MyTrips token={token}/>} />
        <Route path="/trip/:id" element={<TripDetails token={token}/>} />
        <Route path="/tasks/:id" element={<TaskPage/>} />
        <Route path="/users/me" element={<Account token={token}/>}/>
        <Route path="/users/login" element={<Login token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>} />
        <Route path = "/users/register" element = {<Register token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>}/>
        <Route path="/trip/:id/members/manage" element={<ManageMembers token={token} />} />
        <Route path="*" element={<Dashboard/>} />
      </Routes>
    </>
  );
}

export default App;