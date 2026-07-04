type Props = {

    total: number;

};

function DatasetCard({

    total

}: Props) {

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <h2 className="text-2xl font-bold">

                Dataset Overview

            </h2>

            <div className="mt-8">

                <p className="text-slate-500">

                    Total Samples

                </p>

                <h1 className="text-6xl font-bold text-indigo-600">

                    {total}

                </h1>

            </div>

        </div>

    );

}

export default DatasetCard;