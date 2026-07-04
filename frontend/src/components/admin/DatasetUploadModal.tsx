import { useState } from "react";
import { UploadCloud, ImageIcon, Loader2 } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    onUpload: (formData: FormData) => Promise<void>;
};

function DatasetUploadModal({
    open,
    onClose,
    onUpload
}: Props) {

    const [image, setImage] = useState<File | null>(null);

    const [preview, setPreview] = useState("");

    const [height, setHeight] = useState("");

    const [gender, setGender] = useState("Male");

    const [age, setAge] = useState("");

    const [weight, setWeight] = useState("");

    const [cameraDistance, setCameraDistance] = useState("");

    const [uploading, setUploading] = useState(false);

    if (!open) return null;

    function resetForm() {

        setImage(null);

        setPreview("");

        setHeight("");

        setGender("Male");

        setAge("");

        setWeight("");

        setCameraDistance("");

    }

    async function handleSubmit() {

        if (!image) {

            alert("Please choose an image.");

            return;

        }

        const formData = new FormData();

        formData.append("image", image);

        formData.append("height", height);

        formData.append("gender", gender);

        formData.append("age", age);

        formData.append("weight", weight);

        formData.append("camera_distance", cameraDistance);

        try {

            setUploading(true);

            await onUpload(formData);

            resetForm();

            onClose();

        }

        finally {

            setUploading(false);

        }

    }

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl">

                <div className="p-8 border-b border-slate-200 dark:border-slate-700">

                    <h2 className="text-3xl font-bold">

                        Upload Training Sample

                    </h2>

                    <p className="text-slate-500 mt-2">

                        Add a new labelled image for AI model training.

                    </p>

                </div>

                <div className="p-8 space-y-8">

                    {/* Upload Area */}

                    <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">

                        {

                            preview ?

                                (

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        className="w-52 h-52 rounded-xl object-cover shadow"

                                    />

                                )

                                :

                                (

                                    <>

                                        <UploadCloud

                                            size={60}

                                            className="text-indigo-600"

                                        />

                                        <p className="mt-4 font-semibold">

                                            Click to choose an image

                                        </p>

                                        <p className="text-slate-500 text-sm">

                                            JPG • PNG • JPEG

                                        </p>

                                    </>

                                )

                        }

                        <input

                            type="file"

                            hidden

                            accept="image/*"

                            onChange={(e) => {

                                if (!e.target.files) return;

                                const file = e.target.files[0];

                                setImage(file);

                                setPreview(URL.createObjectURL(file));

                            }}

                        />

                    </label>

                    <div className="grid md:grid-cols-2 gap-5">

                        <input

                            type="number"

                            placeholder="Height (cm)"

                            value={height}

                            onChange={(e) => setHeight(e.target.value)}

                            className="border rounded-xl p-3"

                        />

                        <select

                            value={gender}

                            onChange={(e) => setGender(e.target.value)}

                            className="border rounded-xl p-3"

                        >

                            <option>Male</option>

                            <option>Female</option>

                        </select>

                        <input

                            type="number"

                            placeholder="Age"

                            value={age}

                            onChange={(e) => setAge(e.target.value)}

                            className="border rounded-xl p-3"

                        />

                        <input

                            type="number"

                            placeholder="Weight (kg)"

                            value={weight}

                            onChange={(e) => setWeight(e.target.value)}

                            className="border rounded-xl p-3"

                        />

                        <input

                            type="number"

                            step="0.1"

                            placeholder="Camera Distance (m)"

                            value={cameraDistance}

                            onChange={(e) => setCameraDistance(e.target.value)}

                            className="border rounded-xl p-3 md:col-span-2"

                        />

                    </div>

                </div>

                <div className="flex justify-end gap-4 p-8 border-t border-slate-200 dark:border-slate-700">

                    <button

                        onClick={() => {

                            resetForm();

                            onClose();

                        }}

                        className="px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"

                    >

                        Cancel

                    </button>

                    <button

                        disabled={uploading}

                        onClick={handleSubmit}

                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 disabled:opacity-60"

                    >

                        {

                            uploading ?

                                <Loader2 className="animate-spin" size={18} />

                                :

                                <ImageIcon size={18} />

                        }

                        {

                            uploading ?

                                "Uploading..."

                                :

                                "Upload Sample"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DatasetUploadModal;