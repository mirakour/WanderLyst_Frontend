import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function tripMembers({ token }) {
	const { id } = useParams();
	const [tripMembers, setTripMembers] = useState([]);

    	useEffect(() => {
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
		fetchTripMembers();
	}, []);


	return (
		<>  
			{!tripMembers.length === 0 ? (
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
					<p>Looks like you're on your own.</p>
					<button>Add a travel companion</button>
				</>
			)}
		</>
	);
}
