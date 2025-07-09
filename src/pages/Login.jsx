import { useState } from "react"

export default function Login({setToken}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit (event){
    event.preventDefault();
    try{
        const response = await fetch ("http://localhost:3000/api/login", {
            method: "POST",
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await response.json();
        setToken(result.accessToken);
    }catch(error){
        console.log(error)
    };
    // try {
    //     const res = await fetch(`http://localhost:4000/users/login/getInfo/${username}`);
    //     const data = await res.json();
    //     console.log(data);
    //     setUserId(data.id);
    //   } catch (err) {
    //     console.error(err);
    //   }
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