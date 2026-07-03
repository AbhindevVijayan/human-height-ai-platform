import { useEffect, useState } from "react";
import { getModelInfo, reloadModel } from "../../api/model";

type ModelInfo = {
    algorithm: string;
    active_model: string;
    samples: number;
    features: string[] | string;
    trained_at: string;
};

function ModelCard() {

    const [model, setModel] = useState<ModelInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadModel();
    }, []);

    async function loadModel() {
        try {
            setLoading(true);
            const data = await getModelInfo();
            setModel(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleReload() {

        try {

            await reloadModel();

            await loadModel();

            alert("Latest model loaded.");

        }

        catch (err) {

            console.error(err);

            alert("Unable to reload model.");

        }

    }

    if (loading) {

        return (

            <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Current Model

                </h2>

                <p>Loading...</p>

            </div>

        );

    }

    if (!model) {

        return (

            <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

                Failed to load model.

            </div>

        );

    }

    const featureCount = Array.isArray(model.features)
        ? model.features.length
        : String(model.features).split(",").length;

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">

                    Current Model

                </h2>

                <button

                    onClick={handleReload}

                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"

                >

                    Reload

                </button>

            </div>

            <div className="space-y-5">

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Algorithm

                    </span>

                    <strong>

                        {model.algorithm}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Version

                    </span>

                    <strong>

                        {model.active_model}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Samples

                    </span>

                    <strong>

                        {model.samples}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Features

                    </span>

                    <strong>

                        {featureCount}

                    </strong>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Last Trained

                    </span>

                    <strong>

                        {new Date(model.trained_at).toLocaleString()}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default ModelCard;