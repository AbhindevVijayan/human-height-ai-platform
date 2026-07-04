import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import { getPredictionHistory } from "../../api/predictionHistory";

type Prediction = {
    id: number;
    image: string;
    predicted_height: number;
    gender: string;
    age: number;
    weight: number;
    camera_distance: number;
    processing_time: number;
    created_at: string;
};

function History() {

    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

        try {

            const data = await getPredictionHistory();

            setPredictions(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    return (

        <AdminLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Prediction Logs
                    </h1>

                    <p className="text-slate-500 mt-2">
                        View every AI prediction stored in the system.
                    </p>

                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-x-auto">

                    {loading ? (

                        <div className="p-10">
                            Loading prediction history...
                        </div>

                    ) : (

                        <table className="min-w-full">

                            <thead className="bg-slate-100 dark:bg-slate-800">

                                <tr>

                                    <th className="p-4 text-left">ID</th>
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Height</th>
                                    <th className="p-4 text-left">Gender</th>
                                    <th className="p-4 text-left">Age</th>
                                    <th className="p-4 text-left">Weight</th>
                                    <th className="p-4 text-left">Distance</th>
                                    <th className="p-4 text-left">Time</th>
                                    <th className="p-4 text-left">Created</th>

                                </tr>

                            </thead>

                            <tbody>

                                {predictions.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-t hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >

                                        <td className="p-4">{item.id}</td>

                                        <td className="p-4">{item.image}</td>

                                        <td className="p-4 font-semibold text-indigo-600">
                                            {item.predicted_height} cm
                                        </td>

                                        <td className="p-4">
                                            {item.gender}
                                        </td>

                                        <td className="p-4">
                                            {item.age}
                                        </td>

                                        <td className="p-4">
                                            {item.weight}
                                        </td>

                                        <td className="p-4">
                                            {item.camera_distance} m
                                        </td>

                                        <td className="p-4">
                                            {item.processing_time.toFixed(3)} s
                                        </td>

                                        <td className="p-4">
                                            {new Date(item.created_at).toLocaleString()}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        </AdminLayout>

    );

}

export default History;