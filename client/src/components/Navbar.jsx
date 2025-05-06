import { HelpCircle, Search, Settings } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // const { user } = useAuth();
    // const navigate = useNavigate();

    return (
        <header className="w-full h-12 flex items-center justify-between px-4 bg-purple-header text-white dark:bg-zinc-900 border-b border-1 border-gray-50">

            {/* Logo/Title */}
            <div className="font-semibold text-large">To Do</div>

            {/* Searchbar */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-[30%]">
                    <input type="text" placeholder="Search" className="w-full text-black dark:bg-zinc-800 dark:text-white text-sm rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                    <Search className="absolute text-green-800 dark:text-blue-400 left-2 top-1/2 -translate-y-1/2" size={16} />
                </div>
            </div>

            {/* Accessibility */}
            <div className="flex items-center space-x-4 text-black">
                <Settings className="text-white" size={18} />
                <HelpCircle className="text-white" size={18} />
                <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center text-sm font-medium text-white">JM</div>
                <ThemeToggleButton />
            </div>
        </header>
    );
}

export default Navbar;