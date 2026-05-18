import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../utils/auth";
import API from "../api";

function Register(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        if(isLoggedIn()){
            navigate("/");
        }
    },[navigate]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        try{
            const res = await API.post("/users/register",{
                username,
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            toast.success("Registration successful");
            navigate("/");
        }catch(err){
            console.log(err);
            toast.error("Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
                <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8">
                    <h2 className="text-3xl font-bold">Register</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Create your account to start managing files.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                        <div>
                            <label className="mb-2 block text-sm text-slate-300" htmlFor="register-name">
                                Name
                            </label>
                            <input
                                id="register-name"
                                type="text"
                                placeholder="Your name"
                                autoComplete="name"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300" htmlFor="register-email">
                                Email
                            </label>
                            <input
                                id="register-email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-300" htmlFor="register-password">
                                Password
                            </label>
                            <input
                                id="register-password"
                                type="password"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-500"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-sky-400 hover:text-sky-300">
                            Login instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;