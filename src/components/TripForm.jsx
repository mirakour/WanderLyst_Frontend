import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TripForm({ token , status , trip , setTrip , setIsEditing }) {
	const [title, setTitle] = useState(trip?.title || "");
	const [description, setDescription] = useState(trip?.description || "");
	const [startDate, setStartDate] = useState(trip?.start_date ? trip.start_date.slice(0, 10) : "");
	const [endDate, setEndDate] = useState(trip?.end_date ? trip.end_date.slice(0, 10) : "");
	const navigate = useNavigate();

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

			const contentType = res.headers.get("content-type");
			let data;
			if (contentType && contentType.includes("application/json")) {
				data = await res.json();
			} else {
				data = await res.text();
			}
			console.log(data);
			navigate(`/trip/${data.id}`, { replace: true });
		} catch (err) {
			console.error(err);
		}
	}


	async function handleUpdate(event) {
		event.preventDefault();

		try {
			const res = await fetch(`http://localhost:3000/api/trip/${trip.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					id: trip.id,
					title: title,
					description: description,
					start_date: startDate,
					end_date: endDate,
				}),
			});

			const contentType = res.headers.get("content-type");
			let data;
			if (contentType && contentType.includes("application/json")) {
				data = await res.json();
			} else {
				data = await res.text();
			}
			console.log(data);
            setTrip(data);
            setIsEditing(false);
			navigate(`/trip/${trip.id}`, { replace: true });
		} catch (err) {
			console.error(err);
		}
	}

		return (
			<>
				{!token ? (
					<button
						onClick={() => navigate("/users/login", { replace: true })}
					>
						Login to Plan a Trip
					</button>
				) : (
					<div className="formContainer">
						<h2>{status === "edit" ? "Update Your Trip" : "Plan Your Trip"}</h2>
						<form onSubmit={status === "edit" ? handleUpdate : handleSubmit}>
							<label htmlFor="title" className="formLabel">
								Trip Title:
								<br />
								<input
									type="text"
									id="title"
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</label>
							<br />

							<label htmlFor="startDate" className="formLabel">
								Start Date:
								<br />
								<input
									type="date"
									id="startDate"
									name="Start Date"
									value={startDate}
									onChange={(e) =>
										setStartDate(e.target.value)
									}
								/>
							</label>
							<br />

							<label htmlFor="endDate" className="formLabel">
								End Date:
								<br />
								<input
									type="date"
									id="endDate"
									name="End Date"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
								/>
							</label>
							<br />

							<label htmlFor="description" className="formLabel">
								Description:
								<br />
								<textarea
									id="description"
									value={description}
									rows="4"
									cols="25"
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</label>
							<br />

							<button>{status === "edit" ? "Update Trip" : "Submit New Trip" }</button>
						</form>
					</div>
				)}
			</>
		);
}