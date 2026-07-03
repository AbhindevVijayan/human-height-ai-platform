import { useEffect, useState } from "react";
import { getSystemHealth } from "../../api/system";

type Health = {
    status: string;
    service?: string;
};

function SystemCard() {

    const [health, setHealth] = useState<Health | null>(null);

    const [lastChecked, setLastChecked] = useState("");

    useEffect(() => {

        loadHealth();

    }, []);

    async function loadHealth() {

        try {

            const data = await getSystemHealth();

            setHealth(data);

            setLastChecked(new Date().toLocaleTimeString());

        }

        catch {

            setHealth({
                status: "Offline",
                service: "Unavailable"
            });

        }

    }

    const healthy = health?.status === "healthy";

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">

                    System Health

                </h2>

                <button

                    onClick={loadHealth}

                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"

                >

                    Refresh

                </button>

            </div>

            <div className="flex items-center gap-5 mb-8">

                <div className={`h-6 w-6 rounded-full ${healthy ? "bg-green-500" : "bg-red-500"}`} />

                <div>

                    <h3 className="text-2xl font-bold">

                        {health?.status ?? "Checking..."}

                    </h3>

                    <p className="text-slate-500">

                        {health?.service}

                    </p>

                </div>

            </div>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        AI Engine

                    </span>

                    <strong>

                        {healthy ? "Online" : "Offline"}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Dataset Service

                    </span>

                    <strong>

                        Online

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Last Checked

                    </span>

                    <strong>

                        {lastChecked}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Uptime

                    </span>

                    <strong>

                        99.9%

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default SystemCard;