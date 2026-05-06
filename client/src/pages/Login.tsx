import { useState } from "react";
import API from "../api";

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async ()=>{
        try{
            const res = await API.post ("/users/login",{
                email,
                password,
            });

            //save token
            localStorage.setItem("token",res.data.token);

            alert("Login Successful");

            window.location.href = "/";
        }catch(err){
            console.log(err);
            alert("Login failed");
        }
    };

    return (
        <div style={{ padding:"20px"}}>
            <h2>Login</h2>

            <input 
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br/>

            <input 
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <br/>

            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;