import { Trash2, Image as ImageIcon } from "lucide-react";

type Sample = {
    id: number;
    image: string;
    height: number;
    gender: string;
    age: number;
    weight: number;
    camera_distance: number;
};

type Props = {
    samples: Sample[];
    onDelete: (id: number) => void;
};

function DatasetTable({ samples, onDelete }: Props) {

    if (samples.length === 0) {

        return (

            <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-16 text-center">

                <ImageIcon
                    size={64}
                    className="mx-auto text-slate-400"
                />

                <h2 className="text-2xl font-bold mt-6">

                    No Dataset Available

                </h2>

                <p className="text-slate-500 mt-2">

                    Upload your first training image to begin building the AI model.

                </p>

            </div>

        );

    }

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0">

                        <tr className="text-left">

                            <th className="px-6 py-4">ID</th>

                            <th className="px-6 py-4">Image</th>

                            <th className="px-6 py-4">Height</th>

                            <th className="px-6 py-4">Gender</th>

                            <th className="px-6 py-4">Age</th>

                            <th className="px-6 py-4">Weight</th>

                            <th className="px-6 py-4">Distance</th>

                            <th className="px-6 py-4 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {samples.map((sample) => (

                            <tr
                                key={sample.id}
                                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >

                                <td className="px-6 py-4 font-semibold">

                                    #{sample.id}

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-4">

                                        <img

                                            src={`http://localhost:8000/dataset/image/${sample.image.split("/").pop()}`}

                                            alt={sample.image}

                                            onError={(e) => {

                                                (e.currentTarget as HTMLImageElement).src =
                                                    "https://placehold.co/64x64?text=No+Image";

                                            }}

                                            className="w-16 h-16 rounded-xl object-cover border border-slate-300"

                                        />

                                        <div>

                                            <p className="font-semibold">

                                                {sample.image.split("/").pop()}

                                            </p>

                                            <p className="text-sm text-slate-500">

                                                Training Sample

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-4">

                                    <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full px-3 py-1 font-semibold">

                                        {sample.height} cm

                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    <span className="capitalize rounded-full bg-slate-200 dark:bg-slate-700 px-3 py-1">

                                        {sample.gender}

                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    {sample.age}

                                </td>

                                <td className="px-6 py-4">

                                    {sample.weight} kg

                                </td>

                                <td className="px-6 py-4">

                                    {sample.camera_distance} m

                                </td>

                                <td className="px-6 py-4 text-center">

                                    <button

                                        onClick={() => onDelete(sample.id)}

                                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition"

                                    >

                                        <Trash2 size={16} />

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default DatasetTable;