import { useState } from "react";

export default function EventCreationForm({ tripId, token, setShowForm }) {
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/trip/${tripId}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          location,
          date_time: date,
          status
        })
      });
      const rawData = await response.json();
      setMessage(rawData.message);
      if (rawData.message === "event created") {
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleBackButton(e) {
    e.preventDefault();
    setShowForm(false);
  }

  return (
    <div className="eventFormContainer">
        <h2>Create Event</h2>
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
            <label className="eventForm">
            Event Title:
            <input className="eventInput" onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="eventForm">
            Event Location:
            <input className="eventInput" onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label className="eventForm">
            Event Date:
            <input className="eventInput" type="date" onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="eventForm">
            Event Status:
            <input className="eventInput" onChange={(e) => setStatus(e.target.value)} />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button id="submitButton">Submit</button>
            <button id="cancelButton" onClick={handleBackButton}>Cancel</button>
    </div>
  </form>
</div>
  );
}