import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ManageMembers({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("TOKEN IN ManageMembers:", token);
    fetchMembers();
  }, [id, token]);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/trip/${id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed fetching members:", text);
        setMembers([]);  // Ensure state remains array
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setMembers(data);
      } else {
        console.warn("Expected array but got:", data);
        setMembers([]);
      }
    } catch (err) {
      console.error(err);
      setMembers([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/trip/${id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        fetchMembers();
      } else {
        const errorText = await res.text();
        console.error("Failed adding member:", errorText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/trip/${id}/members/${memberId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchMembers();
      } else {
        const errorText = await res.text();
        console.error("Failed deleting member:", errorText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-box">
      <h2>Manage Trip Members</h2>
      <form onSubmit={handleAdd}>
        <input
            type="email"
            placeholder="Enter member email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="manage-members-input"
        />
        <button type="submit" className="auth-button">Add Member</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        {members.length === 0 && <p>No members yet.</p>}
        {members.map((member) => (
          <div key={member.id} style={{ marginBottom: "1rem" }}>
            <p style={{ display: "inline-block", marginRight: "1rem" }}>{member.user_email}</p>
            <button onClick={() => handleDelete(member.id)} className="deleteTripButton">Delete</button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)} className="goBackButton">Back to Trip</button>
    </div>
  );
}