import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import type { ReactNode } from "react";
import { getSettings } from "../api/settings";

interface Settings {

    platform_name: string;

    organization: string;

    auto_activate_model: boolean;

    prediction_logging: boolean;

    confidence_threshold: number;

    max_upload_size: number;

    allowed_formats: string[];

    n_estimators: number;

    random_seed: number;

}

interface SettingsContextType {

    settings: Settings | null;

    refreshSettings: () => Promise<void>;

}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({

    children

}: {

    children: ReactNode;

}) {

    const [settings, setSettings] = useState<Settings | null>(null);

    async function refreshSettings() {

        try {

            const data = await getSettings();

            setSettings(data);

            document.title = data.platform_name;

        }

        catch (error) {

            console.error("Failed to load settings", error);

        }

    }

    useEffect(() => {

        refreshSettings();

    }, []);

    return (

        <SettingsContext.Provider

            value={{

                settings,

                refreshSettings

            }}

        >

            {children}

        </SettingsContext.Provider>

    );

}

export function useSettings() {

    const context = useContext(SettingsContext);

    if (!context) {

        throw new Error(

            "useSettings must be used inside SettingsProvider"

        );

    }

    return context;

}