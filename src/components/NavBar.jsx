import {Link} from "react-router-dom";

function NavBar ({token, setToken, setUserId, userId}){

const logout = () => {
    setToken(null);
    setUserId(null)
};

    return(
    <div className="navItems">
        {token ? 
            <>
            <Link to="/" className="navLink"> <img src='/logo.png' alt="logo" width="100" height="100"/> </Link>

            <Link to="/trip/public" className="navLink">
            Public Trips
            </Link>

            <Link to="/inspiration" className="navLink">
            Inspiration
            </Link>

            <Link to={`/trip/new`} className="navLink">
            Plan a Trip
            </Link>

            <Link to={`/trip/user/${(userId)}`} className="navLink">
            My Trips
            </Link>

            <Link to={`/trip/${(userId)}`} className="navLink">
            My Tasks
            </Link>

            <Link to={`/users/me`} className="navLink">
            My Account
            </Link>

            <button onClick={logout} className="button">Logout</button>
            </>
            : 
            <div>
            <Link to="/" className="navLink"> <img src='/logo.png' alt="logo" width="100" height="100"/> </Link>

            <Link to="/trip/public" className="navLink"> Public Trips </Link>

            <Link to="/inspiration" className="navLink"> Inspiration </Link>

            <Link to="/users/login" className="navLink"> Plan a Trip </Link>

            <Link to="/users/login" className="navLink"> Login </Link>
            
            <Link to="/users/register" className="navLink"> Register </Link> 
            </div>
        }
        </div>
    )

}

export default NavBar