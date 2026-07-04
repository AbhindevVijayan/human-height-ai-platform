import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BrainCircuit,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import { registerUser } from "../api/auth";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({

        full_name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });

    function updateField(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleRegister(
        e: React.FormEvent
    ) {

        e.preventDefault();

        setError("");

        setSuccess("");

        if (
            !form.full_name ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {

            setError("Please fill all fields.");

            return;

        }

        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        if (form.password.length < 6) {

            setError("Password should be at least 6 characters.");

            return;

        }

        try {

            setLoading(true);

            const response = await registerUser({

                full_name: form.full_name,

                email: form.email,

                password: form.password

            });

            if (response.success) {

                setSuccess("Registration Successful.");

                setTimeout(() => {

                    navigate("/login");

                }, 1500);

            }

            else {

                setError(response.message);

            }

        }

        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Unable to register."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6">

            <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 shadow-2xl p-10">

                <div className="flex flex-col items-center">

                    <BrainCircuit
                        size={60}
                        className="text-indigo-600"
                    />

                    <h1 className="text-3xl font-bold mt-4">

                        MeasureWise AI

                    </h1>

                    <p className="text-slate-500 mt-2 text-center">

                        Create your account to access AI powered human height estimation.

                    </p>

                </div>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5 mt-10"
                >
                    <div>

                        <label className="block mb-2 font-semibold">

                            Full Name

                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input

                                type="text"

                                name="full_name"

                                value={form.full_name}

                                onChange={updateField}

                                placeholder="John Doe"

                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Email

                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input

                                type="email"

                                name="email"

                                value={form.email}

                                onChange={updateField}

                                placeholder="john@example.com"

                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Password

                        </label>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                name="password"

                                value={form.password}

                                onChange={updateField}

                                placeholder="Create Password"

                                className="w-full pl-12 pr-12 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"

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

                                    showPassword

                                        ? <EyeOff size={18} />

                                        : <Eye size={18} />

                                }

                            </button>

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Confirm Password

                        </label>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="absolute left-4 top-4 text-slate-400"
                            />

                            <input

                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }

                                name="confirmPassword"

                                value={form.confirmPassword}

                                onChange={updateField}

                                placeholder="Confirm Password"

                                className="w-full pl-12 pr-12 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"

                            />

                            <button

                                type="button"

                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }

                                className="absolute right-4 top-4"

                            >

                                {

                                    showConfirmPassword

                                        ? <EyeOff size={18} />

                                        : <Eye size={18} />

                                }

                            </button>

                        </div>

                    </div>

                    {

                        error && (

                            <div className="rounded-xl bg-red-100 text-red-700 px-4 py-3">

                                {error}

                            </div>

                        )

                    }

                    {

                        success && (

                            <div className="rounded-xl bg-green-100 text-green-700 px-4 py-3">

                                {success}

                            </div>

                        )

                    }

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Create Account"

                        }

                    </button>

                </form>

                <div className="mt-8 text-center text-slate-500">

                    Already have an account?

                    <Link

                        to="/login"

                        className="ml-2 text-indigo-600 font-semibold"

                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;
