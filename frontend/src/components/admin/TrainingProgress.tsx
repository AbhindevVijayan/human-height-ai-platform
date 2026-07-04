import { CheckCircle2, Loader2 } from "lucide-react";

type Props = {

    progress: number;

    running: boolean;

    currentStep: string;

};

function TrainingProgress({

    progress,

    running,

    currentStep

}: Props) {

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-8">

                Training Progress

            </h2>

            <div className="w-full h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">

                <div

                    className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-500"

                    style={{

                        width: `${progress}%`

                    }}

                />

            </div>

            <div className="flex justify-between mt-3">

                <span className="text-slate-500">

                    Progress

                </span>

                <strong>

                    {progress}%

                </strong>

            </div>

            <div className="mt-8 rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

                {

                    running ?

                        (

                            <div className="flex items-center gap-3">

                                <Loader2

                                    size={22}

                                    className="animate-spin text-indigo-600"

                                />

                                <div>

                                    <p className="font-semibold">

                                        {currentStep}

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        AI model is currently training...

                                    </p>

                                </div>

                            </div>

                        )

                        :

                        (

                            <div className="flex items-center gap-3">

                                <CheckCircle2

                                    size={22}

                                    className="text-green-600"

                                />

                                <div>

                                    <p className="font-semibold">

                                        Ready for Training

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        Click "Train New Model" to begin.

                                    </p>

                                </div>

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default TrainingProgress;