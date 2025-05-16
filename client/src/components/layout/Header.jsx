import { Search, Bell, UserCircle, SquareCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "../../context/ThemeProvider";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-background border-b border-gray-300 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center">
                <SquareCheckBig className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-xl font-semibold text-gray-800">Taskly</span>
            </div>
            <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Global Search..."
                        className="pl-10 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                    <Bell className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
                    <UserCircle className="h-6 w-6" />
                </Button>
            </div>
        </header>
    )
}

export default Header