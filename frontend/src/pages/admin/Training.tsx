import { useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import TrainingCard from "../../components/admin/TrainingCard";
import TrainingProgress from "../../components/admin/TrainingProgress";
import TrainingLogs from "../../components/admin/TrainingLogs";
import TrainingHistory from "../../components/admin/TrainingHistory";
import { startTraining } from "../../api/training";

function Training() {

    const [running, setRunning] = useState(false);

    const [progress, setProgress] = useState(0);

    const [currentStep, setCurrentStep] = useState("Ready");

    const [logs, setLogs] = useState<string[]>([]);
    const [trainingResult, setTrainingResult] = useState<any>(null);

    const history = [

        {
            version: "height_model_v21.pkl",
            accuracy: 97.6,
            samples: 503,
            date: "03 Jul 2026"
        },

        {
            version: "height_model_v20.pkl",
            accuracy: 97.1,
            samples: 462,
            date: "28 Jun 2026"
        },

        {
            version: "height_model_v19.pkl",
            accuracy: 96.8,
            samples: 410,
            date: "20 Jun 2026"
        }

    ];

    async function trainModel() {

        if (running) return;

        setRunning(true);
        setProgress(10);
        setCurrentStep("Connecting to ML Training Service...");
        setLogs([]);
        setTrainingResult(null);

        try {

            setLogs([
                `${new Date().toLocaleTimeString()} Connected to ML Training Service`
            ]);

            const result = await startTraining();

            setProgress(100);

            setCurrentStep("Training Completed Successfully");

            setTrainingResult(result);

            setLogs(prev => [

                ...prev,

                `${new Date().toLocaleTimeString()} Model: ${result.model}`,

                `${new Date().toLocaleTimeString()} Samples: ${result.samples}`,

                `${new Date().toLocaleTimeString()} MAE: ${result.mae}`,

                `${new Date().toLocaleTimeString()} RMSE: ${result.rmse}`,

                `${new Date().toLocaleTimeString()} R² Score: ${result.r2}`

            ]);

        }

        catch (error: any) {

            console.error(error);

            const message =
                error.response?.data?.detail ||
                error.message ||
                "Unknown Error";

            setCurrentStep("Training Failed");

            setLogs(prev => [
                ...prev,
                `${new Date().toLocaleTimeString()} ${message}`
            ]);

        }

        finally {

            setRunning(false);

        }

    }

    return (

        <AdminLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-5xl font-bold">

                        AI Model Training Center

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Train, monitor and manage the Human Height Prediction Model.

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <TrainingCard
                        model={trainingResult?.algorithm || "RandomForestRegressor"}
                        version={trainingResult?.model || "No Model"}
                        samples={trainingResult?.samples || 0}
                        estimatedTime="8 Seconds"
                        status={running ? "Training..." : "Ready"}
                    />

                    <TrainingProgress

                        progress={progress}

                        running={running}

                        currentStep={currentStep}

                    />

                </div>

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-10 flex flex-col items-center">

                    <button

                        disabled={running}

                        onClick={trainModel}

                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-12 py-5 rounded-2xl text-xl font-bold transition"

                    >

                        {running ?

                            "Training Model..." :

                            "🚀 Train New Model"}

                    </button>

                    <p className="text-slate-500 mt-5">

                        Training uses the latest uploaded dataset and automatically replaces the production model.

                    </p>

                </div>

                <TrainingLogs

                    logs={logs}

                />
                {trainingResult && (

                    <div className="rounded-3xl bg-white shadow-xl p-8">

                        <h2 className="text-2xl font-bold mb-4">

                            Latest Training Result

                        </h2>

                        <p><strong>Model:</strong> {trainingResult.model}</p>

                        <p><strong>Algorithm:</strong> {trainingResult.algorithm}</p>

                        <p><strong>Samples:</strong> {trainingResult.samples}</p>

                        <p><strong>MAE:</strong> {trainingResult.mae}</p>

                        <p><strong>RMSE:</strong> {trainingResult.rmse}</p>

                        <p><strong>R²:</strong> {trainingResult.r2}</p>

                    </div>

                )}

                <TrainingHistory

                    history={history}

                />

            </div>

        </AdminLayout>

    );

}

export default Training;