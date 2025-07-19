import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Events(passedData){
    const { tripId } = useParams();
    const [eventsList, setEventsList] = useState(null) //this varible holds a list of all the events
    
    const [title, setTitle] = useState(null)
    const [location, setLocation] = useState(null)
    const [status, setStatus] = useState(null)

    async function getEvents() {
        try{
            const response = await fetch(`http://localhost:3000/api/trip/${tripId}/events`,{
                headers: { 
                    "Authorization":  `Bearer ${passedData.token}`
                }
            })
            const rawData = await response.json()

            //this takes the list of objects and reformats them into various html elements
            setEventsList(rawData.map((item) => {
                return <div id="EventListing" key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Location: {item.location}</p>
                    <p>Status: {item.status}</p>
                </div>
            }))
        }catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
       getEvents() 
    },[]);

    async function handleSubmit(event){
        event.preventDefault();

        try{
            const response = await fetch(`URL-goes-here/api/trips/${passedData.tripIdPlaceHolder}/events`,{
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":  `Bearer ${passedData.tokenPlaceHolder}`
                }, 
                body: JSON.stringify({ 
                    title: title, 
                    location: location,
                    status: status
                })
            })
        }catch (error){
            console.error(error)
        }
    }
    
    return(
    <>
        <h2>Events</h2>
        <Link to={`../trip/trip/${tripId}`}>
        <button>Go Back</button>
        </Link>
        {eventsList && <div>{eventsList}</div>}
        
        <h3>Create New Event</h3>
        <form onSubmit={handleSubmit}>
            <label id="formContent">
                Event Title: <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <br></br>
            <label id="formContent">
                Event Location: <input value={location} onChange={(e) => setLocation(e.target.value)}/>
            </label>
            <br></br>
            <label id="formContent">
                Event Status: <input value={status} onChange={(e) => setStatus(e.target.value)}/>
            </label>
            <br></br>
            <button id="formContent">Submit</button>
        </form>
    </>
    )
}