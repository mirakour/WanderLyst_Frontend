import { useState } from "react";

export default function Register({setToken}){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")


    async function handleSubmit(event){
        event.preventDefault();

        try{
            const response = await fetch ("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password
                })
            })

            const result = await response.json();
            setToken(result.accessToken)
        } catch (error){
            console.log(error)
        };
    };

    return(
        <>
                <h2 className="registerTitle">Sign Up Here!</h2>
        <br/>
        <div className="registerForm">
        {
            <form onSubmit={handleSubmit}>
                <label className="userTitle">
                    Full Name: 
                        <input
                            name ="name"
                            required
                            onChange = {(e)=>setName(e.target.value)}
                            value = {name}
                        />
                </label>
                <br/><br/>
                <label className="userEmail">
                    Email: 
                        <input
                            name = "email"
                            required
                            onChange = {(e)=>setEmail(e.target.value)}
                            value={email}
                        />
                </label>
                <br/><br/>
                <label className="passTitle">
                    Password: 
                        <input
                            name = "password"
                            required
                            onChange = {(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                </label>
                <br/><br/>
                <button className = "button">Submit</button>

            </form>
        }
        </div>
        </>
    )
}