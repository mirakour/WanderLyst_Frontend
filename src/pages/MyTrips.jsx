import {useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TripForm from "../components/TripForm";


export default function MyTrips( {token} ){
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()
    


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
        <Link to="/users/login" replace>
            <h2>Please Login To See Your Trips</h2>
        </Link>


        </>
        )
    }else return(
        <>
            {trips.length > 0 && token ?        
            <div className="MyTripsGrid">
            <h2>My Trips</h2>
                {trips.map((trip) => (

                            
            <div key={trip.id} className="tripCard">
            <Link to={`/trip/trip/${trip.id}`}>

                <h3 className="tripTitle">{trip.title}</h3>
            </Link>    
            </div>
            ))}  
            </div>
            :
            <>
                <h3>Looks like you don't have any trips yet</h3>
                <h4>Plan your first trip</h4>
                <TripForm token={token}/>
            </>
            }
        </>
    )
}