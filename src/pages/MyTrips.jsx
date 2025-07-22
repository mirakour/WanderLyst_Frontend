import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TripForm from "../components/TripForm";

export default function MyTrips({ token }) {
    const [view, setView] = useState("all");
	const [trips, setTrips] = useState([]);
	const [events, setEvents] = useState({});
	const [favoriteTripIds, setFavoriteTripIds] = useState([]);

	useEffect(() => {
		const fetchTrips = async () => {
			try {
				//Define Trips
				const tripsRes = await fetch(
					"http://localhost:3000/api/trip/mytrips",
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				const tripsData = await tripsRes.json();
				setTrips(tripsData);

				// Define events for each trip
				const eventsPromises = tripsData.map(async (trip) => {
					const eventsRes = await fetch(
						`http://localhost:3000/api/trip/${trip.id}/events`,
						{
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					const eventsData = await eventsRes.json();
					return { tripId: trip.id, events: eventsData };
				});

				const eventsResults = await Promise.all(eventsPromises);
				const eventsObj = {};
				eventsResults.forEach(({ tripId, events }) => {
					eventsObj[tripId] = events;
				});
				setEvents(eventsObj);

				// Set favorite status for each trip
				const favRes = await fetch(
					"http://localhost:3000/api/favorites",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const favData = await favRes.json();
				console.log("Favorite Data:", favData);
				setFavoriteTripIds(
                Array.isArray(favData.favorites) ?
                    favData.favorites.map(fav => fav.trip_id)
                    :
                    []
                );
			} catch (err) {
				console.error(err);
			}
		};
		fetchTrips();
	}, []);

	// filter trips by view
	function filterTrips(trips, view) {
		const now = new Date();
		switch (view) {
			case "upcoming":
				return trips.filter((trip) => new Date(trip.start_date) > now);
			case "current":
				return trips.filter(
					(trip) =>
						new Date(trip.start_date) <= now &&
						new Date(trip.end_date) >= now
				);
			case "past":
				return trips.filter((trip) => new Date(trip.end_date) < now);
			case "favorites":
				return trips.filter((trip) =>
					favoriteTripIds.includes(trip.id)
				);
			case "all":
			default:
				return trips;
		}
	}

	if (!token) {
		return (
			<>
				<h1>Hmm...</h1>
				<Link to="/users/login" replace>
					<h2>Please Login To See Your Trips</h2>
				</Link>
			</>
		);
	} else
		return (
			<>
				{trips.length > 0 && token ? (
					<div className="MyTripsGrid">
                    <div className="MyTripsHeader">
                        <h2>My Trips</h2>
                        <label 
                    htmlFor="tripView"
                    className="tripFilter">
                        Filter Trips: 
                        <br></br>
					<select
						id="tripView"
						value={view}
						onChange={(e) => setView(e.target.value)}
						style={{ marginBottom: "1rem" }}
					>
                        
						<option value="all">All</option>
						<option value="upcoming">Upcoming</option>
						<option value="current">Current</option>
						<option value="past">Past</option>
                        <option value="favorites">Favorites</option>
					</select>
                    </label>
                    </div>
						{filterTrips(trips, view).map((trip) => (
							<div className="MyFilteredTrips" key={trip.id}>
								<div key={trip.id} className="tripCard">
									<h3 className="tripTitle">{trip.title}</h3>
									<p className="tripDates">
										{trip.start_date ?
                                        new Date(
													trip.start_date
											  ).toLocaleDateString()
											: 
                                            "N/A"}
										-
										{trip.end_date ? 
                                        new Date(
													trip.end_date
											  ).toLocaleDateString()
											:
                                            "N/A"}
									</p>
									<p className="eventCounter">
										Events:{" "}
										{events[trip.id] ?
                                        events[trip.id].length
											:
                                            0}
									</p>
									<Link to={`/trip/${trip.id}`}>
										<p>See Trip Details</p>
									</Link>
								</div>
							</div>
						))}
					</div>
				) : (
					<>
						<h3>
							Looks like you don't have any trips this fit this
							criteria
						</h3>
						<h4>Plan a trip</h4>
						<TripForm token={token} />
					</>
				)}
			</>
		);
}
