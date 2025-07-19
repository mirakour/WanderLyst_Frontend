import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Events(passedData){
    const [message, setMessage] = useState(null)
    const [eventsList, setEventsList] = useState([]) //this varible holds a list of all the events

    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState(null)
    const [location, setLocation] = useState(null)
    const [status, setStatus] = useState(null)
   
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
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
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

    async function handleSubmit(event){
        event.preventDefault();

        try{
            const response = await fetch(`http://localhost:3000/api/trip/${passedData.tripId}/events`,{
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":  `Bearer ${passedData.token}`
                }, 
                body: JSON.stringify({ 
                    title: title, 
                    location: location,
                    status: status
                })
            })
            const rawData = await response.json()
            setMessage(rawData.message)
            if(rawData.message == "event created"){
                setShowForm(false)
            }
        }catch (error){
            console.error(error)
        }
    }

    function handleFormButton(event){
        event.preventDefault()
        setMessage(null)
        setShowForm(true)
    }

    function handleBackButton(){
        event.preventDefault()
        setShowForm(false)
    }
    
    return(
    <>
        {showForm ? 
            <div id="formBox">
                <h2>Create Event</h2>
                {message && <div>{message}</div>}
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
                    <button onClick={handleBackButton}>Cancel</button> 
                </form>
                
            </div>
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