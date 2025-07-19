import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/users/login"), 2000);
      } else {
        setSuccessMessage(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Email:</label>
        <input
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  </div>
 );
}
