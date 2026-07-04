import { BrainCircuit, Cpu, Database, Clock3 } from "lucide-react";

type Props = {
    model: string;
    version: string;
    samples: number;
    estimatedTime: string;
    status: string;
};

function TrainingCard({
    model,
    version,
    samples,
    estimatedTime,
    status
}: Props) {

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <div className="flex items-center gap-3 mb-8">

                <BrainCircuit
                    size={32}
                    className="text-indigo-600"
                />

                <div>

                    <h2 className="text-2xl font-bold">

                        Current AI Model

                    </h2>

                    <p className="text-slate-500">

                        Active production model

                    </p>

                </div>

            </div>

            <div className="space-y-5">

                <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2">

                        <Cpu size={18} />

                        Algorithm

                    </span>

                    <strong>{model}</strong>

                </div>

                <div className="flex justify-between items-center">

                    <span>

                        Model Version

                    </span>

                    <strong>{version}</strong>

                </div>

                <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2">

                        <Database size={18} />

                        Dataset Samples

                    </span>

                    <strong>{samples}</strong>

                </div>

                <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2">

                        <Clock3 size={18} />

                        Estimated Time

                    </span>

                    <strong>{estimatedTime}</strong>

                </div>

                <div className="pt-4 border-t">

                    <span className="text-slate-500">

                        Status

                    </span>

                    <div className="mt-2">

                        <span className="rounded-full bg-green-100 text-green-700 px-4 py-2 font-semibold">

                            🟢 {status}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TrainingCard;