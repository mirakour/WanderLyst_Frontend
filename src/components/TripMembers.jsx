import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TripMembers({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripMembers, setTripMembers] = useState([]);

  const fetchTripMembers = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/trip/${id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Error fetching members:", text);
        setTripMembers([]);
        return;
      }
      const data = await res.json();
      setTripMembers(data);
    } catch (err) {
      console.error(err);
      setTripMembers([]);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/trip/${id}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchTripMembers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTripMembers();
  }, [id, token]);

  return (
    <>
      <h3>Trip Members</h3>
      {tripMembers.length > 0 ? (
        tripMembers.map((member) => (
          <div key={member.id} style={{ marginBottom: "0.5rem" }}>
            <p style={{ display: "inline-block", marginRight: "1rem" }}>{member.user_email}</p>
            <button onClick={() => handleDelete(member.id)} className="deleteTripButton">
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>Looks like you're on your own.</p>
      )}

      <button
        className="auth-button"
        onClick={() => navigate(`/trip/${id}/members/manage`)}
        style={{ marginTop: "1rem" }}
      >
        Add a travel companion
      </button>
    </>
  );
}