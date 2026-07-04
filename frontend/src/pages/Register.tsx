import { Link } from "react-router-dom";
import { BrainCircuit, UserPlus } from "lucide-react";

function Register() {

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

                        Create your account to access AI-powered height prediction.

                    </p>

                </div>

                <form className="mt-10 space-y-6">

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Full Name

                        </label>

                        <input

                            type="text"

                            placeholder="Enter your full name"

                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Email Address

                        </label>

                        <input

                            type="email"

                            placeholder="Enter your email"

                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Password

                        </label>

                        <input

                            type="password"

                            placeholder="Create a password"

                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Confirm Password

                        </label>

                        <input

                            type="password"

                            placeholder="Confirm your password"

                            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 outline-none focus:ring-4 focus:ring-indigo-200"

                        />

                    </div>

                    <button

                        type="button"

                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition"

                    >

                        <UserPlus size={20} />

                        Create Account

                    </button>

                </form>

                <div className="mt-8 text-center text-slate-500">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-indigo-600 font-semibold ml-2"

                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;