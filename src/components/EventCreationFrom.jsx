import { useState, useEffect } from "react";

export default function EventCreationFrom(passedData){
    const [message, setMessage] = useState(null)

    const [title, setTitle] = useState(null)
    const [location, setLocation] = useState(null)
    const [date, setDate] = useState(null)
    const [status, setStatus] = useState(null)

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
                    date_time: date,
                    status: status
                })
            })
            const rawData = await response.json()
            setMessage(rawData.message)
            if(rawData.message == "event created"){
                passedData.setShowForm(false)
            }
        }catch (error){
            console.error(error)
        }
    }

    function handleBackButton(event){
        event.preventDefault()
        passedData.setShowForm(false)
    }

    return(
    <>
        <div id="formBox">
            <h2>Create Event</h2>
            {message && <div>{message}</div>}
            <form onSubmit={handleSubmit}>
                <label id="formContent">
                    Event Title: <input onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <br></br>
                <label id="formContent">
                    Event Location: <input onChange={(e) => setLocation(e.target.value)}/>
                </label>
                <br></br>
                <label id="formContent">
                    Event Date: <input type="date" onChange={(e) => setDate(e.target.value)}/>
                </label>
                <br></br>
                <label id="formContent">
                    Event Status: <input onChange={(e) => setStatus(e.target.value)}/>
                </label>
                <br></br>
                <button id="formContent">Submit</button>
                <button onClick={handleBackButton}>Cancel</button> 
            </form>
                
        </div>
    </>
    )
}