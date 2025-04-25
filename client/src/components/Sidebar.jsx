import { useState } from "react";
import { Calendar, List, Star, Sun } from "lucide-react";

function Sidebar() {
    const [isListExpanded, seListExpanded] = useState(true);

    const getListIcon = (icon) => {
        switch (icon) {
            case 'sun':
                return <Sun size={18} />
            case 'star':
                return <Star size={18} />
            case 'calender':
                return <Calendar size={18} />
            default:
                return <List size={18} />
        }
    }

    return (
        <div className = "w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-semibold">To Do</h1>
            </div>
        </div>
    );
}

export default Sidebar