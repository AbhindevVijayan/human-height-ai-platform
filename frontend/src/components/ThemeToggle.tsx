import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {

    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
            {dark ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;