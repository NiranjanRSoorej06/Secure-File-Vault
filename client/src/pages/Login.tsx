import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../utils/auth";
import API from "../api";

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedIn()){
            navigate("/");
        }
    },[navigate]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        try{
            const res = await API.post("/users/login",{
                email,
                password,
            });

            //save token
            localStorage.setItem("token",res.data.token);

            toast.success("Login successful");

            navigate("/");
        }catch(err){
            console.log(err);
            toast.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
                <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8">
                    <h2 className="text-3xl font-bold">Login</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to access your files.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="mb-2 block text-sm text-slate-300" htmlFor="login-email">
                                Email
                            </label>
                            <input
                                id="login-email"
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
                            <label className="mb-2 block text-sm text-slate-300" htmlFor="login-password">
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500"
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-500"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        New here?{' '}
                        <Link to="/register" className="text-sky-400 hover:text-sky-300">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;