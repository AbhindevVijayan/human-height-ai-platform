function StatsCard() {

    const stats = [

        {
            title: "Predictions",
            value: "8",
            color: "text-indigo-600"
        },

        {
            title: "Dataset Images",
            value: "503",
            color: "text-green-600"
        },

        {
            title: "AI Accuracy",
            value: "94.8%",
            color: "text-orange-500"
        },

        {
            title: "Average Time",
            value: "0.83 s",
            color: "text-blue-500"
        }

    ];

    return (

        <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

            <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold">

                    Platform Statistics

                </h2>

                <span className="text-sm text-slate-500">

                    Live Overview

                </span>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-6"
                    >

                        <p className="text-slate-500">

                            {item.title}

                        </p>

                        <h1 className={`text-4xl font-bold mt-3 ${item.color}`}>

                            {item.value}

                        </h1>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StatsCard;