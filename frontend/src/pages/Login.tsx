import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    BrainCircuit,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn
} from "lucide-react";

import { loginUser } from "../api/auth";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    function updateField(

        e: React.ChangeEvent<HTMLInputElement>

    ) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }
    async function handleLogin(

        e: React.FormEvent

    ) {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            const response = await loginUser({
                email: form.email,
                password: form.password,
            });

            if (!response.success) {

                setError(

                    response.message

                );

                setLoading(false);

                return;

            }

            localStorage.setItem(

                "access_token",

                response.access_token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(

                    response.user

                )

            );

            navigate("/");

        }

        catch (err: any) {

            setError(

                err?.response?.data?.message ||

                "Unable to login."

            );

        }

        finally {

            setLoading(false);

        }

    }
    return (

        <div className="min-h-[80vh] flex items-center justify-center">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-10">

                <div className="flex flex-col items-center">

                    <BrainCircuit
                        size={60}
                        className="text-indigo-600"
                    />

                    <h1 className="text-3xl font-bold mt-5">

                        MeasureWise AI

                    </h1>

                    <p className="text-slate-500 mt-2 text-center">

                        Sign in to access your AI-powered height prediction dashboard.

                    </p>

                </div>

                <form

                    onSubmit={handleLogin}

                    className="mt-10 space-y-6"

                >

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Email Address

                        </label>

                        <div className="relative">

                            <Mail
                                className="absolute left-4 top-4 text-slate-400"
                                size={20}
                            />

                            <input

                                type="email"

                                name="email"

                                value={form.email}

                                onChange={updateField}

                                placeholder="Enter your email"

                                required

                                className="w-full pl-12 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Password

                        </label>

                        <div className="relative">

                            <Lock
                                className="absolute left-4 top-4 text-slate-400"
                                size={20}
                            />

                            <input

                                type={showPassword ? "text" : "password"}

                                name="password"

                                value={form.password}

                                onChange={updateField}

                                placeholder="Enter your password"

                                required

                                className="w-full pl-12 pr-12 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    setShowPassword(

                                        !showPassword

                                    )

                                }

                                className="absolute right-4 top-4"

                            >

                                {

                                    showPassword ?

                                        <EyeOff size={20} /> :

                                        <Eye size={20} />

                                }

                            </button>

                        </div>

                    </div>

                    {

                        error && (

                            <div className="text-red-500 text-sm">

                                {error}

                            </div>

                        )

                    }

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition"

                    >

                        <LogIn size={20} />

                        {

                            loading ?

                                "Signing In..." :

                                "Login"

                        }

                    </button>

                </form>

                <div className="mt-8 text-center text-slate-500">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-indigo-600 font-semibold ml-2"

                    >

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;