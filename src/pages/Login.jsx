import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken, userId, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.accessToken);
        setUserId(result.user.id);
        navigate("/users/me", { replace: true });
      } else {
        setErrorMessage(result.error || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          required
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          required
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  </div>
 );
}