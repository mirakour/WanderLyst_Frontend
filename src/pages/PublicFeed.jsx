import {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function publicFeed(){
    const [trips, setTrips] = useState([])
    const baseUrl = import.meta.env.VITE_API_URL;
    
    useEffect(()=>{
        const fetchTrips = async () => {
        try {
            const res = await fetch("${baseUrl}/api/trip/public");
            const data = await res.json();
            setTrips(data);
        } catch (err) {
            console.error(err)
        }
        }
        fetchTrips();
    }, []);
    console.log(trips)

    return(
        <>
            <h1>Public Trips</h1>        
            <div className="publicTripGrid">
                {trips.map((trip) => (

                            
            <div key={trip.id} className="tripCard">
            <Link to={`/trip/public/${trip.id}`}>

                <h3 className="tripTitle">{trip.title}</h3>
            </Link>    
            </div>
            ))}  
            </div>
        </>
    )
}