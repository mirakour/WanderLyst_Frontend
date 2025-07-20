import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TripMembers from "../components/TripMembers";
import Events from "../components/Events";

export default function TripDetails({ token }) {
	const { id } = useParams();
	const [trip, setTrip] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
        console.log("TOKEN at TripDetails:", token);
		//Define Trip
		const fetchTrip = async () => {
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

		fetchTrip();
	}, []);

	async function deleteTrip() {
		try {
			const res = await fetch(`http://localhost:3000/api/trip/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				navigate("/mytrips"); // Redirect to MyTrips after deletion
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
		}
	}

	async function toggleTripPublic() {
		setLoading(true);
		try {
			const endpoint = trip.public_shared
				? `http://localhost:3000/api/trip/${id}/private`
				: `http://localhost:3000/api/trip/${id}/public`;
			const res = await fetch(endpoint, {
				method: "PATCH",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setTrip(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="tripDetailsPage">
			{trip.title ? (
				<>
					<div className="tripDetails">
						<h1 className="tripTitle">{trip.title}</h1>
						<h2 className="tripDescription">{trip.description}</h2>
						<p className="tripDate">
							{trip.start_date
								? new Date(trip.start_date).toLocaleDateString()
								: "N/A"}
							-
							{trip.end_date
								? new Date(trip.end_date).toLocaleDateString()
								: "N/A"}
						</p>
					</div>

					<h2>Trip Members</h2>
					<TripMembers token={token} />

					<Events token={token} tripId={id} />
					<br />
					<p>
						Event Privacy Status:
						<strong>
							{trip.public_shared ? "Public" : "Private"}
						</strong>
					</p>
					<button onClick={toggleTripPublic} disabled={loading}>
						Make {trip.public_shared ? "Private" : "Public"}
					</button>
					<br />
					<span>
						<button
							className="goBackButton"
							onClick={() => navigate(-1)}
						>
							Go Back
						</button>
						<button
							className="deleteTripButton"
							onClick={deleteTrip}
						>
							Delete Trip
						</button>
					</span>
				</>
			) : (
				<>
					<h1>Are you sure you're in the right place?</h1>
					<button>Plan a trip</button>
				</>
			)}
		</div>
	);
}
