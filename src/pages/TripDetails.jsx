import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TripMembers from "../components/TripMembers";
import Events from "../components/Events";

export default function TripDetails({ token }) {
	const { id } = useParams();
	const [trip, setTrip] = useState({});
	const [events, setEvents] = useState([]);
	const [tripMembers, setTripMembers] = useState([]);

	useEffect(() => {
		//Define Trip
		const fetchTrips = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/trip/${id}`,
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
		// //Define Trip Members
		// const fetchTripMembers = async () => {
		// 	try {
		// 		const res = await fetch(
		// 			`http://localhost:3000/api/trip/${id}/members`,
		// 			{
		// 				headers: { Authorization: `Bearer ${token}` },
		// 			}
		// 		);
		// 		const data = await res.json();
		// 		setTripMembers(data);
		// 	} catch (err) {
		// 		console.error(err);
		// 	}
		// };
		//Define Events
		const fetchEvents = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/trip/${id}/events`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();
				setEvents(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchTrips();
		// fetchTripMembers();
		fetchEvents();
	}, []);

	return (
		<>
			{trip.title ? (
				<>
					<div className="tripDetails">
						<h1 className="tripTitle">{trip.title}</h1>
						<p className="tripDescription">Overview: {trip.description}</p>
						<p className="tripLocation">{trip.location}</p>
						<p className="tripDate">{trip.start_date}</p>	
						<p className="tripDate">{trip.end_date}</p>
					</div>

					<h2>Trip Members</h2>
					<TripMembers token={token} />

					<h2>What's on the agenda?</h2>
					{!events.length === 0  ? (
						<div className="EventsGrid">
							<Link to={`/trip/${id}/events`}>
                            <h3>Events</h3>
							</Link>
							{events.map((event) => (
								<div key={event.id} className="tripEventCard">
									<Link to={`/trip/${id}/events`}>
									<p>{event.title}</p>
									</Link>
									<p>{event.location}</p>
									<p>{event.status}</p>
								</div>
							))}
						</div>
					) : (
						<>
							<p>This trip has no agenda</p>
						</>
					)
}
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
