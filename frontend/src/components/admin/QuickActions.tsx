import { Download, BrainCircuit, RefreshCw, Trash2 } from "lucide-react";

function QuickActions() {

    async function reloadModel() {

        try {

            await fetch("http://localhost:9000/model/reload", {

                method: "POST"

            });

            alert("Latest model loaded.");

        }

        catch {

            alert("Unable to reload model.");

        }

    }

    async function trainModel() {

        try {

            await fetch("http://localhost:9000/train", {

                method: "POST"

            });

            alert("Training started.");

        }

        catch {

            alert("Training failed.");

        }

    }

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-8">

                Quick Actions

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                <button

                    onClick={reloadModel}

                    className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white p-5 flex flex-col items-center gap-3 transition"

                >

                    <RefreshCw size={30} />

                    Reload Model

                </button>

                <button

                    onClick={trainModel}

                    className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white p-5 flex flex-col items-center gap-3 transition"

                >

                    <BrainCircuit size={30} />

                    Train Model

                </button>

                <button

                    className="rounded-2xl bg-green-600 hover:bg-green-700 text-white p-5 flex flex-col items-center gap-3 transition"

                >

                    <Download size={30} />

                    Export History

                </button>

                <button

                    className="rounded-2xl bg-red-600 hover:bg-red-700 text-white p-5 flex flex-col items-center gap-3 transition"

                >

                    <Trash2 size={30} />

                    Clear Cache

                </button>

            </div>

        </div>

    );

}

export default QuickActions;