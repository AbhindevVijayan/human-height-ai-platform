import { History } from "lucide-react";

type Run = {

    version: string;

    accuracy: number;

    samples: number;

    date: string;

};

type Props = {

    history: Run[];

};

function TrainingHistory({ history }: Props) {

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <div className="flex items-center gap-3 mb-6">

                <History size={24} />

                <h2 className="text-2xl font-bold">

                    Previous Training Runs

                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">

                                Version

                            </th>

                            <th className="text-left py-3">

                                Accuracy

                            </th>

                            <th className="text-left py-3">

                                Samples

                            </th>

                            <th className="text-left py-3">

                                Date

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            history.map((run) => (

                                <tr
                                    key={run.version}
                                    className="border-b last:border-none"
                                >

                                    <td className="py-4 font-semibold">

                                        {run.version}

                                    </td>

                                    <td className="py-4 text-green-600 font-semibold">

                                        {run.accuracy}%

                                    </td>

                                    <td className="py-4">

                                        {run.samples}

                                    </td>

                                    <td className="py-4">

                                        {run.date}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TrainingHistory;