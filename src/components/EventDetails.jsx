import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function EventDetails(passedData){
    const { id } = useParams()
    const [singleEvent, setSingleEvent] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [newStatus, setNewStatus] = useState(null)
    const [eventDeleted, setEventDeleted] = useState(false)

    async function getEvent() {
        try{
            const response = await fetch(`http://localhost:3000/api/events/${id}`,{
                headers: { 
                    "Authorization":  `Bearer ${passedData.token}`
                }
            })
            const rawData = await response.json()
            
            setSingleEvent(rawData)
        }catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getEvent() 
    },[showForm]);

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/events/${id}`,{
                method: "PUT", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":  `Bearer ${passedData.token}`
                }, 
                body: JSON.stringify({ 
                    status: newStatus
                })
            })
            const rawData = await response.json()
            closeForm()
        }catch (error){
            console.error(error)
        }
    }

    async function deleteEvent(event) {
        event.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/events/${id}`,{
                method: "DELETE", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization":  `Bearer ${passedData.token}`
                }, 
                body: JSON.stringify({ 
                    id: id
                })
            })
            const rawData = await response.json()
            setEventDeleted(true)
        }catch (error){
            console.error(error)
        }
    }

    function openForm(event){
        event.preventDefault()
        setShowForm(true)
    }

    function closeForm(event){
        setShowForm(false)
    }

    return(
    <>
        {singleEvent && <div>
            {eventDeleted ? <>
                <h1>Event has been deleted</h1>
                <Link to={`/trip/${singleEvent.trip_id}`} 
                    ><button >Go Back</button>
                </Link>
            </>
            : <>
                <h1>{singleEvent.title}</h1>
                <Link to={`/trip/${singleEvent.trip_id}`} 
                    ><button >Go Back</button>
                </Link>
                <h3>Location</h3>
                <p>{singleEvent.location}</p>
                <h3>Date</h3>
                <p>{singleEvent.date_time}</p>
                <h3>Status</h3>
                {showForm ? <>
                    <form onSubmit={handleSubmit}>
                        <label id="formContent">
                            New Status: <input onChange={(e) => setNewStatus(e.target.value)}/>
                        </label>
                        <br></br>
                        <button id="formContent">Submit</button>
                        <button onClick={closeForm}>Cancel</button> 
                    </form>
                </>: <>
                    <button onClick={openForm}>Edit Status</button>
                    <p>{singleEvent.status}</p>
                </>}
                
                <button onClick={deleteEvent}>Delete Event</button>
            </>}
        </div>}
    </>)
}