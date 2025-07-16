import {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function MyTrips( {token} ){
    const [trips, setTrips] = useState([])
    
    useEffect(()=>{
        const fetchTrips = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/trip/mytrips",
            {headers: {Authorization: `Bearer ${token}`}}
            );
            const data = await res.json();
            setTrips(data);
        } catch (err) {
            console.error(err)
        }
        }
        fetchTrips();
    }, []);
    console.log(trips)

    if (!token) {
        return(
        <>
        <h1>Hmm...</h1>
        <h2>Please Login To See Your Trips</h2>
        <button>Login</button>
        </>
        )
    }else return(
        <>
            <h1>My Trips</h1>
            {trips.length > 0?        
            <div className="MyTripsGrid">
                {trips.map((trip) => (

                            
            <div key={trip.id} className="tripCard">
            <Link to={`/api/trip/${trip.id}`}>

                <h3 className="tripTitle">{trip.title}</h3>
            </Link>    
            </div>
            ))}  
            </div>
            :
            <>
                <p>Looks like you don't have any trips yet</p>
                <button>Plan your first trip</button>
            </>
            }
        </>
    )
}