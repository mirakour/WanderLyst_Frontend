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

					{!tripMembers.length <= 1 ? (
						<div className="TripMemberGrid">
                            <h3>Trip Members</h3>
							{tripMembers.map((member) => (
								<div key={member.id} className="tripMemberCard">
									<p>{member.user_email}</p>
								</div>
							))}
						</div>
					) : (
						<>
							<p>You are the </p>
							<button>Add a travel companion</button>
						</>
					)}

					{events ? (
						<div className="EventsGrid">
                            <h3>Events</h3>
							{events.map((event) => (
								<div key={event.id} className="tripEventCard">
									<Link to={`/trip/${id}/events`}>
									<p>{event.title}</p>
									</Link>
								</div>
							))}
						</div>
					) : (
						<>
                            <h3>Events</h3>
							<p>This trip has no agenda</p>
							<button>Plan an event</button>
						</>
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
