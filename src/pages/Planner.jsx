import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TripForm from "../components/TripForm";

export default function Planner({ token , userId }) {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const res = await fetch(`http://localhost:3000/api/trip`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: title,
					description: description,
					start_date: startDate,
					end_date: endDate,
				}),
			});
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="plan-trip-container">
  			<h2 className="plan-trip-header">Plan Your Trip</h2>
  			<form onSubmit={handleSubmit}>
    			<label>Trip Title:</label>
    			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

    			<label>Start Date:</label>
    			<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

    			<label>End Date:</label>
    			<input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

    			<label>Description:</label>
    			<textarea value={description} onChange={(e) => setDescription(e.target.value)} />

    			<button type="submit" className="plan-trip-submit">Submit New Trip</button>
  			</form>
		</div>
	);
}
