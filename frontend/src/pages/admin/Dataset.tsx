import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import DatasetCard from "../../components/admin/DatasetCard";
import DatasetTable from "../../components/admin/DatasetTable";
import DatasetUploadModal from "../../components/admin/DatasetUploadModal";

import {
    getDataset,
    uploadDataset,
    deleteDataset
} from "../../api/dataset";

type Sample = {

    id: number;

    image: string;

    height: number;

    gender: string;

    age: number;

    weight: number;

    camera_distance: number;

};

function Dataset() {

    const [samples, setSamples] = useState<Sample[]>([]);

    const [loading, setLoading] = useState(true);

    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {

        loadDataset();

    }, []);

    async function loadDataset() {

        try {

            const data = await getDataset();

            setSamples(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleUpload(formData: FormData) {

        try {

            await uploadDataset(formData);

            await loadDataset();

        }

        catch (err) {

            console.error(err);

        }

    }

    async function handleDelete(id: number) {

        const confirmed = window.confirm(

            "Delete this dataset sample?"

        );

        if (!confirmed) return;

        try {

            await deleteDataset(id);

            await loadDataset();

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <AdminLayout>

            <div className="space-y-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Dataset Manager

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Manage training images used by the AI model.

                        </p>

                    </div>

                    <button

                        onClick={() => setShowUpload(true)}

                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3"

                    >

                        + Upload Sample

                    </button>

                </div>

                <DatasetCard

                    total={samples.length}

                />

                {

                    loading ?

                        (

                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl">

                                Loading dataset...

                            </div>

                        )

                        :

                        (

                            <DatasetTable

                                samples={samples}

                                onDelete={handleDelete}

                            />

                        )

                }

            </div>

            <DatasetUploadModal

                open={showUpload}

                onClose={() => setShowUpload(false)}

                onUpload={handleUpload}

            />

        </AdminLayout>

    );

}

export default Dataset;