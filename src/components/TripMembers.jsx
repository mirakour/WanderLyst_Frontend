import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TripMembers({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripMembers, setTripMembers] = useState([]);

  useEffect(() => {
    console.log("TOKEN at TripMembers component:", token);
    const fetchTripMembers = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/trip/${id}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("Error fetching members:", text);
          return;
        }
        const data = await res.json();
        setTripMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTripMembers();
  }, [id, token]);

  return (
    <>
      {tripMembers.length > 0 ? (
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
          <button
            className="auth-button"
            onClick={() => navigate(`/trip/${id}/members/manage`)}
          >
            Add a travel companion
          </button>
        </>
      )}
    </>
  );
}