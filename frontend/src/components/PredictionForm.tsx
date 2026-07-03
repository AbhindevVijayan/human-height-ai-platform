type Props = {
    age: string;
    weight: string;
    gender: string;
    cameraDistance: string;

    setAge: React.Dispatch<React.SetStateAction<string>>;
    setWeight: React.Dispatch<React.SetStateAction<string>>;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    setCameraDistance: React.Dispatch<React.SetStateAction<string>>;

    onPredict: () => void;
    loading: boolean;
};

export default function PredictionForm({
    age,
    weight,
    gender,
    cameraDistance,
    setAge,
    setWeight,
    setGender,
    setCameraDistance,
    onPredict,
    loading,
}: Props) {
    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8 border border-slate-200 dark:border-slate-700">

            <h2 className="text-2xl font-semibold mb-6">
                User Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    className="border rounded-xl p-3 dark:bg-slate-800"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <input
                    className="border rounded-xl p-3 dark:bg-slate-800"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />

                <select
                    className="border rounded-xl p-3 dark:bg-slate-800"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input
                    className="border rounded-xl p-3 dark:bg-slate-800"
                    placeholder="Camera Distance (m)"
                    value={cameraDistance}
                    onChange={(e) => setCameraDistance(e.target.value)}
                />

            </div>

            <button
                onClick={onPredict}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold"
            >
                {loading ? "Predicting..." : "Predict Height"}
            </button>

        </div>
    );
}