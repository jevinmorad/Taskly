import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";


const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700">
            {theme === 'dark' ? <Sun className="text-yellow-400"/> : <Moon className="text-blue-600" />}
        </button>
    )
}

export default ThemeToggleButton;