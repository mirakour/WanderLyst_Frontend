import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import MyTrips from "./MyTrips";

export default function Account( {token, setUserId } ){
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchTrips = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/user/me",
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            const data = await res.json();
            console.log(`data = ${data}`)
            console.log(data)
            setUser(data);
            console.log(`user = ${user}`)
        } catch (err) {
            console.error(err)
        }
        }
        fetchTrips();
    }, []);

    return(
        <div className="account">
        {token  ?        
            <div className="userDetails"> 
                <h2>Hey {user.name},<br /> here's the plan</h2>

            <MyTrips token={token}/>
            </div>
            :
            <>
                <h2>Please Login/Register to view your Trips</h2>
                <br />
                <button onClick={() => navigate("/users/login", {replace : true})}>Login</button>
                <br />
                <button onClick={() => navigate("/users/register", {replace : true})}>Register</button>
            </>
        }
        </div>
    )
}