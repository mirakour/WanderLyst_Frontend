import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken, userId, setUserId}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function handleSubmit (event){
    event.preventDefault();
    try{
        const response = await fetch ("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await response.json();
        setToken(result.accessToken);
        navigate("/users/me");        
    }catch(error){
        console.log(error)
    };
    };

    return(
        <>
            <div className="login">
    <h2 className="loginTitle">Login Here!</h2>
    <br/>
    <form onSubmit={handleSubmit}>
    <label className="userTitle">
        Email: <input className="emailInput"
        name = "email"
        required
        onChange={(e)=>setEmail(e.target.value)}
        value={email}/>
    </label>
    <br/><br/>
    <label className="passTitle"> Password: <input
        className = "passwordInput"
        name="password"
        required
        onChange={(e)=>setPassword(e.target.value)}
        value={password}/>
         </label>
         <br/><br/>
    <button className="button"> Login </button>

    </form>

    </div>
        </>
    )
}
