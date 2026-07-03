import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

type Props = {
    image: File | null;
    preview: string;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    setPreview: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadCard({
    image,
    preview,
    setImage,
    setPreview,
}: Props) {

    const onDrop = useCallback((acceptedFiles: File[]) => {

        if (!acceptedFiles.length) return;

        const file = acceptedFiles[0];

        setImage(file);

        setPreview(URL.createObjectURL(file));

    }, [setImage, setPreview]);

    const { getRootProps, getInputProps } = useDropzone({

        accept: {

            "image/*": []

        },

        multiple: false,

        onDrop

    });

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition">

            <h2 className="text-2xl font-semibold mb-6">

                Upload Image

            </h2>

            <div
                {...getRootProps()}
                className="h-72 border-2 border-dashed border-indigo-400 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-slate-800 transition"
            >

                <input {...getInputProps()} />

                {preview ? (

                    <img
                        src={preview}
                        alt="preview"
                        className="h-full object-contain rounded-xl"
                    />

                ) : (

                    <div className="text-center">

                        <UploadCloud
                            size={60}
                            className="mx-auto text-indigo-500 mb-4"
                        />

                        <p className="font-semibold">

                            Drag & Drop Image

                        </p>

                        <p className="text-slate-500">

                            or click to upload

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}