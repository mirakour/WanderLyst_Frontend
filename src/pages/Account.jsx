import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import MyTrips from "./MyTrips";

export default function Account( {token, setUserId } ){
    const [user, setUser] = useState({})
    
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
        <div>
        {token  ?        
            <div className="account"> 
                <h1>Hey {user.name}, here's the plan</h1>
                <div className="userDetails">
                <h3 className="Username">{user.name}</h3>
                </div>
                
            <MyTrips token={token}/>
            </div>
            :
            <>
            <Link to="/users/login" replace>
            Please Login to See Your Account Information
            </Link>
            </>
        }
        </div>
    )
}