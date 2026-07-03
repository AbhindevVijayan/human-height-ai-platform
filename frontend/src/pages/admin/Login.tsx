import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../../api/admin";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        setLoading(true);

        try {

            const result = await adminLogin(username, password);

            if (result.success) {

                localStorage.setItem("admin", "true");

                navigate("/admin/dashboard");

            }

            else {

                alert(result.message);

            }

        }

        catch {

            alert("Server error");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">

            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 shadow-2xl p-10">

                <h1 className="text-3xl font-bold text-center mb-2">

                    Admin Portal

                </h1>

                <p className="text-center text-slate-500 mb-8">

                    Human Height AI Platform

                </p>

                <input

                    className="w-full mb-4 rounded-xl border p-3 dark:bg-slate-800"

                    placeholder="Username"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                />

                <input

                    type="password"

                    className="w-full mb-6 rounded-xl border p-3 dark:bg-slate-800"

                    placeholder="Password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                />

                <button

                    onClick={handleLogin}

                    disabled={loading}

                    className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3"

                >

                    {loading ? "Signing In..." : "Login"}

                </button>

            </div>

        </div>

    );
}

export default Login;