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
		<>
			<h1>Plan Your Trip</h1>
			<TripForm token={token}/>
		</>
	);
}
