import { useEffect, useState } from 'react'
import {Routes, Route } from "react-router-dom";
import Account from "./pages/Account.jsx"
import Dashboard from "./pages/Dashboard"
import Inspiration from "./pages/Inspiration"
import Login from "./pages/Login"
import Planner from "./pages/Planner"
import PublicFeed from "./pages/PublicFeed"
import Register from "./pages/Register"
import TaskPage from "./pages/TaskPage"
import MyTrips from "./pages/MyTrips"
import TripDetails from "./pages/TripDetails"
import NavBar from './components/NavBar';
import './App.css'

function App() {
  const [token, setToken] = useState ();
  const [userId, setUserId] = useState ();

      //set token in localStorage
    useEffect(() => {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }, [token]);


      //retrieve token from localStorage
      useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if (storedToken){setToken(storedToken)}
      },[]);

      //set user in localStorage
      useEffect(() => {
        if (token)
          {localStorage.setItem("userId", userId)
        }else{
          localStorage.removeItem("userId")
        }
      }, [userId]);


      //retrieve user from localStorage
      useEffect(()=>{
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId){setUserId(storedUserId)}
      },[]);


  return (
    <>
    <div>  
    <NavBar token={token} setToken={setToken} setUserId={setUserId} userId={userId}/>
    </div>
    
      <Routes>
        <Route path="/trip/public" element={<PublicFeed/>} />
        <Route path="/inspiration" element={<Inspiration/>} />
        <Route path="/trip/new" element={<Planner/>} />
        <Route path="/trip/user/:id" element={<MyTrips/>} />
        <Route path="/trip/trip/:id" element={<TripDetails/>} />
        <Route path="/tasks/:id" element={<TaskPage/>} />
        <Route path="/users/:id" element={<Account token={token}/>}/>
        <Route path="/users/login" element={<Login token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>} />
        <Route path = "/users/register" element = {<Register token={token} setToken={setToken} userId={userId} setUserId={setUserId}/>}/>
        <Route path="*" element={<Dashboard/>} />
      </Routes>
    
    </>
  )
}

export default App
