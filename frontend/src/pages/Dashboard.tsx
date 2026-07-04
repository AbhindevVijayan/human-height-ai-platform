import { useState } from "react";

import UploadCard from "../components/UploadCard";
import PredictionForm from "../components/PredictionForm";

import { predictHeight } from "../api/prediction";

const Dashboard = () => {

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [cameraDistance, setCameraDistance] = useState("");

    const [prediction, setPrediction] = useState<number | null>(null);
    const [processingTime, setProcessingTime] = useState("--");
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {

        if (!image) {

            alert("Please upload an image.");

            return;

        }

        try {

            setLoading(true);

            const result = await predictHeight(
                image,
                age,
                weight,
                gender,
                cameraDistance
            );

            setPrediction(result.predicted_height);

            setProcessingTime(String(result.processing_time));

        }

        catch (error) {

            console.error(error);

            alert("Prediction failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-12">

            {/* Hero */}

            <section className="text-center">

                <h1 className="text-5xl font-bold text-slate-900 dark:text-white">

                    MeasureWise AI

                </h1>

                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">

                    AI-powered human height estimation using computer vision,
                    pose estimation and machine learning.

                </p>

            </section>

            {/* Upload + Result */}

            <section className="grid lg:grid-cols-2 gap-8">

                <UploadCard
                    image={image}
                    preview={preview}
                    setImage={setImage}
                    setPreview={setPreview}
                />

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-slate-200 dark:border-slate-700">

                    <h2 className="text-2xl font-semibold mb-6">

                        Prediction Result

                    </h2>

                    <div className="space-y-6">

                        <div>

                            <p className="text-slate-500">

                                Estimated Height

                            </p>

                            <h1 className="text-6xl font-bold text-indigo-500">

                                {prediction ?? "--"}

                                <span className="text-2xl ml-2">

                                    cm

                                </span>

                            </h1>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-5">

                                <p className="text-sm text-slate-500">

                                    Confidence

                                </p>

                                <h3 className="text-2xl font-semibold">

                                    --

                                </h3>

                            </div>

                            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-5">

                                <p className="text-sm text-slate-500">

                                    Processing Time

                                </p>

                                <h3 className="text-2xl font-semibold">

                                    {processingTime}

                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* User Information */}

            <PredictionForm

                age={age}
                weight={weight}
                gender={gender}
                cameraDistance={cameraDistance}

                setAge={setAge}
                setWeight={setWeight}
                setGender={setGender}
                setCameraDistance={setCameraDistance}

                loading={loading}

                onPredict={handlePredict}

            />

        </div>

    );

};

export default Dashboard;