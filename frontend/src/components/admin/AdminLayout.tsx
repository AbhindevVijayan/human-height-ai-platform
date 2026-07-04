import {
    LayoutDashboard,
    History,
    Database,
    BrainCircuit,
    Settings,
    LogOut,
    UserCircle
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

function AdminLayout({ children }: Props) {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("admin");

        navigate("/admin");

    }

    const menu = [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin/dashboard"
        },

        {
            title: "Prediction Logs",
            icon: History,
            path: "/admin/history"
        },

        {
            title: "Dataset Manager",
            icon: Database,
            path: "/admin/dataset"
        },

        {
            title: "Model Training",
            icon: BrainCircuit,
            path: "/admin/training"
        },

        {
            title: "Settings",
            icon: Settings,
            path: "/admin/settings"
        }

    ];

    return (

        <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950">

            {/* Sidebar */}

            <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

                <div className="p-8 border-b border-slate-700">

                    <h1 className="text-3xl font-bold">

                        MeasureWise AI

                    </h1>

                    <p className="text-sm text-slate-400 mt-2">

                        Enterprise Human Height Estimation Platform

                    </p>

                </div>

                <nav className="flex-1 p-4 space-y-2">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                                        ? "bg-indigo-600 text-white shadow-lg"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >

                                <Icon size={20} />

                                <span>{item.title}</span>

                            </NavLink>

                        );

                    })}

                </nav>

                <div className="p-5 border-t border-slate-700">

                    <button

                        onClick={logout}

                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 py-3 transition"

                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main */}

            <main className="flex-1">

                <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-5 flex justify-between items-center">

                    <div>

                        <h2 className="text-3xl font-bold">

                            Administration Console

                        </h2>

                        <p className="text-slate-500">

                            Monitor models, datasets and predictions

                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        <UserCircle size={36} />

                        <div>

                            <p className="font-semibold">

                                Administrator

                            </p>

                            <p className="text-sm text-slate-500">

                                Online

                            </p>

                        </div>

                    </div>

                </header>

                <div className="p-8">

                    {children}

                </div>

            </main>

        </div>

    );

}

export default AdminLayout;