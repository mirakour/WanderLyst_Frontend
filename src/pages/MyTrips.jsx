import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TripForm from "../components/TripForm";

export default function MyTrips({ token }) {
	const [filter, setfilter] = useState("all");
	const [trips, setTrips] = useState([]);
	const [events, setEvents] = useState({});
	const [favoriteTripIds, setFavoriteTripIds] = useState([]);
    const [sortBy, setSortBy] = useState("created_date");
    const [sortOrder, setSortOrder] = useState("desc");

    const filteredTrips = filterTrips(trips, filter);
    const sortedAndFilteredTrips = sortTrips(filteredTrips, sortBy, sortOrder);


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
					Array.isArray(favData.favorites)
						? favData.favorites.map((fav) => fav.trip_id)
						: []
				);
			} catch (err) {
				console.error(err);
			}
		};
		fetchTrips();
	}, []);

	// filter trips
	function filterTrips(trips, filter) {
		const now = new Date();
		switch (filter) {
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

	// sort Trips
	function sortTrips(trips, sortBy, sortOrder) {
		return [...trips].sort((a, b) => {
			let aValue, bValue;

			switch (sortBy) {
				case "title":
					aValue = a.title?.toLowerCase() || "";
					bValue = b.title?.toLowerCase() || "";
					break;
				case "start_date":
					aValue = new Date(a.start_date || 0);
					bValue = new Date(b.start_date || 0);
					break;
				case "end_date":
					aValue = new Date(a.end_date || 0);
					bValue = new Date(b.end_date || 0);
					break;
                case "created_date":
                    aValue = new Date(a.created_at || 0);
                    bValue = new Date(b.created_at || 0);
                    break;
				case "events":
					aValue = events[a.id]?.length || 0;
					bValue = events[b.id]?.length || 0;
					break;
				default:
					return 0;
			}

			if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
			return 0;
		});
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
	} else return (
			<>
				{trips.length > 0 && token ? (
					<div className="MyTripsGrid">
						<div className="MyTripsHeader">
							<h2>My Trips</h2>

                            <label htmlFor="tripSort" className="tripSort">
								Sort by:
								<br />
								<select
									id="tripSort"
									value={`${sortBy}-${sortOrder}`}
									onChange={(e) => {
										const [field, order] =
											e.target.value.split("-");
										setSortBy(field);
										setSortOrder(order);
									}}
								>
									<option value="start_date-asc">Start Date (Earliest First)</option>
									<option value="start_date-desc">Start Date (Latest First)</option>
									<option value="end_date-asc">End Date (Earliest First)</option>
									<option value="end_date-desc">End Date (Latest First)</option>
                                    <option value="created_date-asc">Created Date (Earliest First)</option>
                                    <option value="created_date-desc">Created Date (Latest First)</option>
									<option value="title-asc">Title (A-Z)</option>
									<option value="title-desc">Title (Z-A)</option>
									<option value="events-desc">Most Events First</option>
									<option value="events-asc">Fewest Events First</option>
								</select>
							</label>

							<label htmlFor="tripfilter" className="tripFilter">
								Filter Trips:
								<br></br>
								<select
									id="tripfilter"
									value={filter}
									onChange={(e) => setfilter(e.target.value)}
								>
									<option value="all">All</option>
									<option value="upcoming">Upcoming</option>
									<option value="current">Current</option>
									<option value="past">Past</option>
									<option value="favorites">Favorites</option>
								</select>
							</label>

						</div>
						{sortedAndFilteredTrips.map((trip) => (
							<div className="MyFilteredTrips" key={trip.id}>
								<div key={trip.id} className="tripCard">
									<h3 className="tripTitle">{trip.title}</h3>
									<p className="tripDates">
										{trip.start_date
											? new Date(
													trip.start_date
											  ).toLocaleDateString()
											: "N/A"}
										-
										{trip.end_date
											? new Date(
													trip.end_date
											  ).toLocaleDateString()
											: "N/A"}
									</p>
									<p className="eventCounter">
										Events:{" "}
										{events[trip.id]
											? events[trip.id].length
											: 0}
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
