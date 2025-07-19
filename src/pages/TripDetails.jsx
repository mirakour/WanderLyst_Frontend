import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TripDetails({ token }) {
	const { id } = useParams();
	const [trip, setTrip] = useState({});
	const [events, setEvents] = useState(null);
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
		//Define Trip Members
		const fetchTripMembers = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/trip/${id}/members`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();
				setTripMembers(data);
			} catch (err) {
				console.error(err);
			}
		};
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
		fetchTripMembers();
		fetchEvents();
	}, []);

	return (
		<>
			{trip.title ? (
				<>
					<div className="tripDetails">
						<h1 className="tripTitle">{trip.title}</h1>
					</div>

					<h2>Trip Members</h2>
					<TripMembers token={token} />

					<Events/>
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
