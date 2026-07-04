import { useEffect, useState } from "react";

import {
    Building2,
    BrainCircuit,
    Database,
    Server,
    Cpu,
    Settings2,
    Save,
    ShieldCheck,
    Upload,
    SlidersHorizontal
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

import {
    getSettings,
    saveSettings
} from "../../api/settings";

function Settings() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState<any>({

        platform_name: "",

        organization: "",

        auto_activate_model: false,

        prediction_logging: false,

        confidence_threshold: 0.85,

        max_upload_size: 20,

        allowed_formats: [],

        n_estimators: 100,

        random_seed: 42

    });

    async function loadSettings() {

        try {

            const data = await getSettings();

            setSettings(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadSettings();

    }, []);

    async function handleSave() {

        try {

            setSaving(true);

            await saveSettings(settings);

            alert("Settings saved successfully.");

        }

        catch (error) {

            console.error(error);

            alert("Failed to save settings.");

        }

        finally {

            setSaving(false);

        }

    }

    if (loading) {

        return (

            <AdminLayout>

                <div className="flex items-center justify-center h-[70vh]">

                    <div className="text-center">

                        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                        <p className="mt-6 text-slate-500 text-lg">

                            Loading Platform Settings...

                        </p>

                    </div>

                </div>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="space-y-8">

                {/* PAGE HEADER */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-5xl font-bold flex items-center gap-4">

                            <Settings2
                                size={42}
                                className="text-indigo-600"
                            />

                            Platform Settings

                        </h1>

                        <p className="text-slate-500 mt-3 text-lg">

                            Configure the AI platform, prediction engine and
                            machine learning environment.

                        </p>

                    </div>
                </div>

            </div>


            {/* SYSTEM STATUS */}

            <div className="grid lg:grid-cols-4 gap-6">

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 border">

                    <div className="flex items-center justify-between">

                        <Database className="text-emerald-600" />

                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>

                    </div>

                    <h3 className="mt-6 text-lg font-semibold">

                        Dataset Service

                    </h3>

                    <p className="text-emerald-600 font-semibold mt-2">

                        Online

                    </p>

                </div>

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 border">

                    <div className="flex items-center justify-between">

                        <Cpu className="text-blue-600" />

                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>

                    </div>

                    <h3 className="mt-6 text-lg font-semibold">

                        AI Engine

                    </h3>

                    <p className="text-emerald-600 font-semibold mt-2">

                        Online

                    </p>

                </div>

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 border">

                    <div className="flex items-center justify-between">

                        <BrainCircuit className="text-violet-600" />

                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>

                    </div>

                    <h3 className="mt-6 text-lg font-semibold">

                        ML Training

                    </h3>

                    <p className="text-emerald-600 font-semibold mt-2">

                        Online

                    </p>

                </div>

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6 border">

                    <div className="flex items-center justify-between">

                        <Server className="text-orange-600" />

                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>

                    </div>

                    <h3 className="mt-6 text-lg font-semibold">

                        Database

                    </h3>

                    <p className="text-emerald-600 font-semibold mt-2">

                        Connected

                    </p>

                </div>

            </div>

            {/* MAIN GRID */}

            <div className="grid lg:grid-cols-2 gap-8">
                {/* PLATFORM INFORMATION */}

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border">

                    <div className="border-b px-8 py-6 flex items-center gap-4">

                        <Building2
                            className="text-indigo-600"
                            size={28}
                        />

                        <div>

                            <h2 className="text-2xl font-bold">

                                Platform Information

                            </h2>

                            <p className="text-slate-500">

                                Basic information about your AI platform.

                            </p>

                        </div>

                    </div>

                    <div className="p-8 space-y-8">

                        <div>

                            <label className="block text-sm font-semibold mb-3">

                                Platform Name

                            </label>

                            <input

                                type="text"

                                value={settings.platform_name}

                                onChange={(e) =>

                                    setSettings({

                                        ...settings,

                                        platform_name: e.target.value

                                    })

                                }

                                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"

                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-3">

                                Organization

                            </label>

                            <input

                                type="text"

                                value={settings.organization}

                                onChange={(e) =>

                                    setSettings({

                                        ...settings,

                                        organization: e.target.value

                                    })

                                }

                                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"

                            />

                        </div>

                        <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800 p-6 border border-indigo-100 dark:border-slate-700">

                            <div className="flex items-center gap-4">

                                <ShieldCheck

                                    size={32}

                                    className="text-indigo-600"

                                />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Enterprise License

                                    </h3>

                                    <p className="text-slate-500">

                                        MeasureWise AI Enterprise Edition

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                {/* AI CONFIGURATION */}

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border">

                    <div className="border-b px-8 py-6 flex items-center gap-4">

                        <BrainCircuit
                            className="text-violet-600"
                            size={28}
                        />

                        <div>

                            <h2 className="text-2xl font-bold">

                                AI Configuration

                            </h2>

                            <p className="text-slate-500">

                                Configure the prediction engine and model behaviour.

                            </p>

                        </div>

                    </div>

                    <div className="p-8 space-y-8">

                        {/* Auto Activate */}

                        <div className="flex items-center justify-between rounded-2xl border p-5">

                            <div>

                                <h3 className="font-semibold text-lg">

                                    Auto Activate Model

                                </h3>

                                <p className="text-slate-500 text-sm">

                                    Automatically deploy newly trained models.

                                </p>

                            </div>

                            <button

                                onClick={() =>

                                    setSettings({

                                        ...settings,

                                        auto_activate_model:
                                            !settings.auto_activate_model

                                    })

                                }

                                className={`relative w-16 h-9 rounded-full transition-all duration-300 ${settings.auto_activate_model

                                        ? "bg-emerald-500"

                                        : "bg-slate-300"

                                    }`}

                            >

                                <span

                                    className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow transition-all duration-300 ${settings.auto_activate_model

                                            ? "left-8"

                                            : "left-1"

                                        }`}

                                />

                            </button>

                        </div>

                        {/* Prediction Logging */}

                        <div className="flex items-center justify-between rounded-2xl border p-5">

                            <div>

                                <h3 className="font-semibold text-lg">

                                    Prediction Logging

                                </h3>

                                <p className="text-slate-500 text-sm">

                                    Save every prediction for analytics.

                                </p>

                            </div>

                            <button

                                onClick={() =>

                                    setSettings({

                                        ...settings,

                                        prediction_logging:
                                            !settings.prediction_logging

                                    })

                                }

                                className={`relative w-16 h-9 rounded-full transition-all duration-300 ${settings.prediction_logging

                                        ? "bg-emerald-500"

                                        : "bg-slate-300"

                                    }`}

                            >

                                <span

                                    className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow transition-all duration-300 ${settings.prediction_logging

                                            ? "left-8"

                                            : "left-1"

                                        }`}

                                />

                            </button>

                        </div>

                        {/* Confidence Threshold */}

                        <div className="rounded-2xl border p-6">

                            <div className="flex items-center justify-between mb-4">

                                <div>

                                    <h3 className="font-semibold text-lg">

                                        Confidence Threshold

                                    </h3>

                                    <p className="text-slate-500 text-sm">

                                        Minimum confidence required for a valid prediction.

                                    </p>

                                </div>

                                <div className="text-2xl font-bold text-indigo-600">

                                    {settings.confidence_threshold}

                                </div>

                            </div>

                            <input

                                type="range"

                                min="0.50"

                                max="1"

                                step="0.01"

                                value={settings.confidence_threshold}

                                onChange={(e) =>

                                    setSettings({

                                        ...settings,

                                        confidence_threshold: parseFloat(

                                            e.target.value

                                        )

                                    })

                                }

                                className="w-full accent-indigo-600"

                            />

                            <div className="flex justify-between text-sm text-slate-500 mt-3">

                                <span>0.50</span>

                                <span>0.75</span>

                                <span>1.00</span>

                            </div>

                        </div>

                    </div>

                </div>
                {/* DATASET CONFIGURATION */}

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border lg:col-span-2">

                    <div className="border-b px-8 py-6 flex items-center gap-4">

                        <Upload
                            className="text-emerald-600"
                            size={28}
                        />

                        <div>

                            <h2 className="text-2xl font-bold">

                                Dataset Configuration

                            </h2>

                            <p className="text-slate-500">

                                Configure upload restrictions and supported dataset formats.

                            </p>

                        </div>

                    </div>

                    <div className="p-8">

                        <div className="grid md:grid-cols-2 gap-10">

                            {/* Upload Size */}

                            <div>

                                <label className="block text-sm font-semibold mb-3">

                                    Maximum Upload Size (MB)

                                </label>

                                <input

                                    type="number"

                                    value={settings.max_upload_size}

                                    onChange={(e) =>

                                        setSettings({

                                            ...settings,

                                            max_upload_size: Number(

                                                e.target.value

                                            )

                                        })

                                    }

                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition"

                                />

                                <p className="text-slate-500 text-sm mt-3">

                                    Maximum size allowed for every uploaded dataset image.

                                </p>

                            </div>

                            {/* Allowed Formats */}

                            <div>

                                <label className="block text-sm font-semibold mb-3">

                                    Allowed Image Formats

                                </label>

                                <div className="flex flex-wrap gap-3">

                                    {settings.allowed_formats.map(

                                        (format: string) => (

                                            <span

                                                key={format}

                                                className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200"

                                            >

                                                {format.toUpperCase()}

                                            </span>

                                        )

                                    )}

                                </div>

                                <p className="text-slate-500 text-sm mt-4">

                                    These formats are accepted by the Dataset Manager.

                                </p>

                            </div>

                        </div>

                        {/* Dataset Information */}

                        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 dark:bg-slate-800 dark:border-slate-700 p-6">

                            <div className="flex items-start gap-5">

                                <Database

                                    size={34}

                                    className="text-emerald-600 mt-1"

                                />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Dataset Recommendations

                                    </h3>

                                    <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">

                                        <li>

                                            • Upload high-quality full-body images.

                                        </li>

                                        <li>

                                            • Maintain consistent camera distance.

                                        </li>

                                        <li>

                                            • Avoid blurry or cropped images.

                                        </li>

                                        <li>

                                            • Use balanced male and female samples.

                                        </li>

                                        <li>

                                            • Ensure accurate height labels.

                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                {/* TRAINING CONFIGURATION */}

                <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border lg:col-span-2">

                    <div className="border-b px-8 py-6 flex items-center gap-4">

                        <SlidersHorizontal
                            className="text-orange-600"
                            size={28}
                        />

                        <div>

                            <h2 className="text-2xl font-bold">

                                Training Configuration

                            </h2>

                            <p className="text-slate-500">

                                Configure the machine learning training engine.

                            </p>

                        </div>

                    </div>

                    <div className="p-8">

                        <div className="grid md:grid-cols-2 gap-10">

                            {/* Number of Trees */}

                            <div>

                                <label className="block text-sm font-semibold mb-3">

                                    Random Forest Trees

                                </label>

                                <input

                                    type="number"

                                    value={settings.n_estimators}

                                    onChange={(e) =>

                                        setSettings({

                                            ...settings,

                                            n_estimators: Number(

                                                e.target.value

                                            )

                                        })

                                    }

                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"

                                />

                                <p className="text-slate-500 text-sm mt-3">

                                    Higher values improve accuracy but increase training time.

                                </p>

                            </div>

                            {/* Random Seed */}

                            <div>

                                <label className="block text-sm font-semibold mb-3">

                                    Random Seed

                                </label>

                                <input

                                    type="number"

                                    value={settings.random_seed}

                                    onChange={(e) =>

                                        setSettings({

                                            ...settings,

                                            random_seed: Number(

                                                e.target.value

                                            )

                                        })

                                    }

                                    className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition"

                                />

                                <p className="text-slate-500 text-sm mt-3">

                                    Keeps model training reproducible across different runs.

                                </p>

                            </div>

                        </div>

                        {/* Training Summary */}

                        <div className="mt-10 grid md:grid-cols-3 gap-6">

                            <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 p-6">

                                <BrainCircuit
                                    size={34}
                                    className="text-indigo-600"
                                />

                                <h3 className="font-bold mt-5">

                                    Algorithm

                                </h3>

                                <p className="text-slate-500 mt-2">

                                    Random Forest Regressor

                                </p>

                            </div>

                            <div className="rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 p-6">

                                <Cpu
                                    size={34}
                                    className="text-emerald-600"
                                />

                                <h3 className="font-bold mt-5">

                                    Training Mode

                                </h3>

                                <p className="text-slate-500 mt-2">

                                    Production Optimized

                                </p>

                            </div>

                            <div className="rounded-2xl bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 p-6">

                                <ShieldCheck
                                    size={34}
                                    className="text-orange-600"
                                />

                                <h3 className="font-bold mt-5">

                                    Model Validation

                                </h3>

                                <p className="text-slate-500 mt-2">

                                    Enabled

                                </p>

                            </div>

                        </div>

                        {/* Save Button */}

                        <div className="mt-12 flex justify-end">

                            <button

                                onClick={handleSave}

                                disabled={saving}

                                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-10 py-4 font-semibold shadow-xl transition-all disabled:opacity-60"

                            >

                                <Save size={20} />

                                {saving ? "Saving Settings..." : "Save Settings"}

                            </button>

                        </div>

                    </div>

                </div>
                {/* END OF SETTINGS GRID */}

            </div>

        </AdminLayout>

    );

}

export default Settings;


