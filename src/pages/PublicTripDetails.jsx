import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PublicTripDetails({ token }) {
	const { id } = useParams();
	const [trip, setTrip] = useState({});
	const [events, setEvents] = useState([]);

	useEffect(() => {
		//Define Trip
		const fetchTrips = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/trip/public/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();
				setTrip(data);
			} catch (err) {
				console.error(err);
			}
		};

		//Define Events
		const fetchEvents = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/trip/public/${id}/events`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();
				//console.log(`events data = ${data}`);
				//console.log(data);
				setEvents(data);
				//console.log(`events = ${events}`);
				//console.log(events);
			} catch (err) {
				console.error(err);
			}
		};

		fetchTrips();
		fetchEvents();
	}, []);

	return (
		<>
			{trip.title ? (
				<>
					<div className="tripDetails">
						<h1 className="tripTitle">{trip.title}</h1>
						<p className="tripDates">
							{trip.start_date
								? new Date(trip.start_date).toLocaleDateString()
								: "N/A"}{" "}
							-{" "}
							{trip.end_date
								? new Date(trip.end_date).toLocaleDateString()
								: "N/A"}
								</p>

					</div>

					{events.length === 0 ? (
						<>
                            <h3>Events</h3>
							<p>This trip has no agenda</p>
							<button>Plan an event</button>
						</>
					) : (
						<div className="EventsGrid">
                            <h3>Events</h3>
							{events.map((event) => (
								<div key={event.id} className="tripEventCard">
									<p>{event.id}: {event.title}</p>
									<p>Location: {event.location}</p>
									<p>Date & Time: {event.date_time
								? new Date(event.date_time).toLocaleDateString()
								: "N/A"}
								</p>
								</div>
							))}
						</div>
					)}
				</>
			) : (
				<>
					<h1>Are you sure you're in the right place?</h1>
					<button>Plan a trip</button>
				</>
			)}
		</>
	);
}
