import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function EventDetails(passedData){
    const { id } = useParams()
    const [singleEvent, setSingleEvent] = useState(null)

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
        },[]);

    return(
    <>
        {singleEvent && <div>
            <h1>{singleEvent.title}</h1>
            <h3>Location</h3>
            <p>{singleEvent.location}</p>
            <h3>Date</h3>
            <p>{singleEvent.date_time}</p>
            <h3>Status</h3>
            <p>{singleEvent.status} <button>Edit Status</button></p>
        </div>}
    </>)
}