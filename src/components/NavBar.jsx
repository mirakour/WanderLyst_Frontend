import { Link } from "react-router-dom";
import logo from "/logo.png";

export default function NavBar({ token, setToken, setUserId, userId }) {
  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/inspiration" className="navLink">Inspiration</Link>
        <Link to="/trip/public" className="navLink">Public Trips</Link>
      </div>

      <div className="navbar-center">
        <img src={logo} alt="logo" />
        <h1>WanderLyst</h1>
      </div>

      <div className="navbar-right">
        {token ? (
          <>
            <Link to="/trip/new" className="navLink">Trip Planner</Link>
            <Link to="/users/me" className="navLink">My Account</Link>
            <button onClick={logout} className="navLink">Logout</button>
          </>
        ) : (
          <>
            <Link to="/users/login" className="navLink">Login</Link>
            <Link to="/users/register" className="navLink">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
