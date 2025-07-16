import {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function Account(){
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")
    
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
        <>
        <h1>Account Information</h1>
        {user ?         
            <div className="userDetails">
                <h3 className="Username">{user.name}</h3>
            </div>
        :
            <></>
        }
        </>
    )
}