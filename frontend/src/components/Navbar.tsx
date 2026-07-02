import { NavLink } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-indigo-500 font-semibold"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition";

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <div className="flex items-center gap-3">
                    <BrainCircuit className="text-indigo-500" size={30} />
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                        Human Height AI
                    </h1>
                </div>

                <div className="flex items-center gap-8">

                    <NavLink to="/" className={linkStyle}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/history" className={linkStyle}>
                        History
                    </NavLink>

                    <NavLink to="/train" className={linkStyle}>
                        Train
                    </NavLink>

                    <NavLink to="/about" className={linkStyle}>
                        About
                    </NavLink>

                    <ThemeToggle />

                </div>

            </div>
        </nav>
    );
};

export default Navbar;