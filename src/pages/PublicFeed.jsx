import {useEffect, useState} from "react";
import { Link } from "react-router-dom";


export default function publicFeed(){
    const [trips, setTrips] = useState([])
    
    useEffect(()=>{
        const fetchTrips = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/trip/public");
            const data = await res.json();
            setTrips(data);
        } catch (err) {
            console.error(err)
        }
        }
        fetchTrips();
    }, []);

    return(
        <>
            <h1>Public Trips</h1>        
            {/* <div className="publicTripGrid">
                {trips.map((trip) => (

                            
            // <Link to={`/api/trip/${trip.id}`}>
            <div key={trip.id} className="tripCard">
                <h3 className="tripTitle">{trip.title}</h3>
            </div>
            // </Link>
            ))}  
            </div> */}
        </>
    )
}