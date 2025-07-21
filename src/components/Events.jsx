import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EventCreationFrom from "./EventCreationFrom";

export default function Events(passedData){
    const [message, setMessage] = useState(null)
    const [eventsList, setEventsList] = useState([]) //this varible holds a list of all the events
    const [showForm, setShowForm] = useState(false)
   
    async function getEvents() {
        try{
            const response = await fetch(`http://localhost:3000/api/trip/${passedData.tripId}/events`,{
                headers: { 
                    "Authorization":  `Bearer ${passedData.token}`
                }
            })
            const rawData = await response.json()
            
            //this takes the list of objects and reformats them into various html elements
            setEventsList(rawData.map((item) => {
                return <div id="EventListing" key={item.id}>
                    <Link to={`/trip/events/${item.id}`}>
                        <h3>{item.title}</h3>
                    </Link>
                    <p>{item.location}</p>
                    <p>{item.date_time}</p>
                    <p>Status: {item.status}</p>
                </div>
            }))
        }catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
       getEvents() 
    },[showForm]);

    function handleFormButton(event){
        event.preventDefault()
        setMessage(null)
        setShowForm(true)
    }
    
    return(
    <>
        {showForm ? 
            <EventCreationFrom token={passedData.token} tripId={passedData.tripId} setShowForm={setShowForm}/>
            : 
            eventsList.length > 0 ? 
                <div>
                    <h2>What's on the agenda?</h2>
                    {eventsList}
                    {passedData.canMakeEvent && <button onClick={handleFormButton}>Create New Event</button>}
                </div> 
                :
                <div>
                    <h2>What's on the agenda?</h2>
                    <p>This trip has no agenda</p>
                    {passedData.canMakeEvent && <button onClick={handleFormButton}>Create New Event</button>}
                </div> 
        }

    </>
    )
}