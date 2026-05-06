import { useState } from "react";
import API from "../api";

function Register(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister = async () =>{
        try{
            await API.post("/users/register",{
                username,
                email,
                password
            });

            alert("Registration successful");
            window.location.href = "/login";
        }catch(err){
            console.log(err);
            alert("Registration failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Registration</h2>

            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>

            <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;