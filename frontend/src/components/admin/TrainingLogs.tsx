import { Terminal } from "lucide-react";

type Props = {
    logs: string[];
};

function TrainingLogs({ logs }: Props) {

    return (

        <div className="rounded-3xl bg-slate-950 text-green-400 shadow-xl p-8">

            <div className="flex items-center gap-3 mb-6">

                <Terminal size={24} />

                <h2 className="text-2xl font-bold">

                    Training Logs

                </h2>

            </div>

            <div className="h-80 overflow-y-auto rounded-xl bg-black p-5 font-mono text-sm space-y-2">

                {

                    logs.length === 0 ?

                        (

                            <p className="text-slate-500">

                                Waiting for training...

                            </p>

                        )

                        :

                        (

                            logs.map((log, index) => (

                                <p key={index}>

                                    {log}

                                </p>

                            ))

                        )

                }

            </div>

        </div>

    );

}

export default TrainingLogs;