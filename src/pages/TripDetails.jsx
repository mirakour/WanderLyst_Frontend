import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TripMembers from "../components/TripMembers";
import Events from "../components/Events";
import TripForm from "../components/TripForm";

export default function TripDetails({ token }) {
	const [isEditing, setIsEditing] = useState();
	const { id } = useParams();
	const [trip, setTrip] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [favorite, setFavorite] = useState();

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
				setTitle(data.title);
				setDescription(data.description);
				setStartDate(data.start_date);
				setEndDate(data.end_date);
			} catch (err) {
				console.error(err);
			}
		};

		const fetchFavoritesStatus = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/favorites/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const data = await res.json();
				if (data.length > 0) {
					setFavorite(true);
				} else {
					setFavorite(false);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchTrip();
		fetchFavoritesStatus();
	}, []);

	async function deleteTrip() {
		try {
			const res = await fetch(`http://localhost:3000/api/trip/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) {
				navigate("/users/me", { replace: true });
			}
		} catch (error) {
			console.error("Error deleting trip:", error);
		}
	}

	async function favoriteTrip() {
		try {
			const res = await fetch(
				`http://localhost:3000/api/favorites/${id}`,
				{
					method: "POST",
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		} catch (error) {
			console.error("Error favoriting trip:", error);
		}
	}

	async function unfavoriteTrip() {
		try {
			const res = await fetch(
				`http://localhost:3000/api/favorites/${id}`,
				{
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		} catch (error) {
			console.error("Error unfavoriting trip:", error);
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
	if (isEditing) {
		return (
			<TripForm
				token={token}
				status="edit"
				trip={trip}
				setTrip={setTrip}
				setIsEditing={setIsEditing}
			/>
		);
	}
	return (
		<div className="tripDetailsPage">
			{isEditing && <TripForm token={token} status="edit" trip={trip} />}

			{trip.title ? (
				<>
					<div className="tripDetailsHeader">
						<h1 className="tripTitle">{trip.title}</h1>
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
					<h2 className="tripDescription">{trip.description}</h2>

					<div className="tripMembers">
						<h2>Who's Going?</h2>
						<TripMembers token={token} />
					</div>

					<div className="tripEvents">
						<Events token={token} tripId={id} canMakeEvent={true} />

						<br />
					</div>

					<p>
						<strong>{favorite ? "Currently Favorited" : ""}</strong>
					</p>
					{favorite ? (
						<button
							className="tripDetailsButton"
							id="unfavoriteTripButton"
							onClick={() => {
								unfavoriteTrip();
								setFavorite(false);
							}}
						>
							Unfavorite
						</button>
					) : (
						<button
							className="tripDetailsButton"
							id="favoriteTripButton"
							onClick={() => {
								favoriteTrip();
								setFavorite(true);
							}}
						>
							Favorite
						</button>
					)}

					<p>
						Event Privacy Status:
						<strong>
							{trip.public_shared ? "Public" : "Private"}
						</strong>
					</p>
					<button
						id="togglePublicButton"
						onClick={toggleTripPublic}
						disabled={loading}
					>
						Make {trip.public_shared ? "Private" : "Public"}
					</button>
					<br />

					<span className="tripDetailsButtons">
						<button
							className="tripDetailsButton"
							id="goBackButton"
							onClick={() => navigate(-1)}
						>
							Go Back
						</button>

						<button
							className="tripDetailsButton"
							id="editTripButton"
							onClick={() => setIsEditing(true)}
						>
							Edit Trip
						</button>

						<button
							className="tripDetailsButton"
							id="deleteTripButton"
							onClick={() => deleteTrip()}
						>
							Delete Trip
						</button>
					</span>
				</>
			) : (
				<>
					<h1>Loading Trip...</h1>
					<TripForm token={token} status="new" />
				</>
			)}
		</div>
	);
}
