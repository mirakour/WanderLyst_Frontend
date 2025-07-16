import { useState, useEffect } from "react";

export default function Events(passedData){

    const [eventsList, setEventsList] = useState(null) //this varible holds a list of all the events
    
    async function getEvents() {
        const response = await fetch(`URL-goes-here/api/trips/${passedData.tripIdPlaceHolder}/events`,{
            headers: { 
                "Authorization":  `Bearer ${passedData.tokenPlaceHolder}`
            }
        })
        const rawData = await response.json()

        //this takes the list of objects and reformats them into various html elements
        setEventsList(rawData.map((item) => {
            return <div id="EventListing" key={item.id}>
                <h3>{item.title}</h3>
                <br></br>
                <p>Location: {item.location}</p>
                <br></br>
                <p>Date: {item.date_time}</p>
                <br></br>
                <p>Status: {item.status}</p>
            </div>
        }))
    }

    useEffect(() => {
       getEvents() 
    },[]);

    function handleClick(){
        //code to go back to TripBoard
    }
    
    return(
    <>
        <h2>Events</h2>
        <button onClick={handleClick}>Go Back</button>
        {eventsList && <div>{eventsList}</div>}
    </>
    )
}