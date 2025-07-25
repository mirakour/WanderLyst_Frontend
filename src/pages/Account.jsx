import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyTrips from "./MyTrips";

export default function Account({ token }) {
	const [user, setUser] = useState({});
	const [view, setView] = useState("all");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/user/me", {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = await res.json();
				setUser(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchTrips();
	}, []);

	return (
		<div className="account">
			{token ? (
                <>
				<div className="accountHeader">
					<h2>Hey {user.name}, here's the plan</h2>

                    </div>
                    <div className="tripList">
					<MyTrips token={token} />
                    </div>
				</>
			) : (
				<>
					<h2>Please Login/Register to view your Trips</h2>
					<br />
					<button
						onClick={() =>
							navigate("/users/login", { replace: true })
						}
					>
						Login
					</button>
					<br />
					<button
						onClick={() =>
							navigate("/users/register", { replace: true })
						}
					>
						Register
					</button>
				</>
			)}
		</div>
	);
}
