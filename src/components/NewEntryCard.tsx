'use client';
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";

const NewEntry = () => {
    const router = useRouter();
    const handleOnClick = async () => {
        const entry = await createNewEntry();
        router.push(`/journal/${entry.id}`)
    }

    return (
        <div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-xl p-8 cursor-pointer hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
            onClick={handleOnClick}
        >
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 group-hover:bg-blue-700 transition-colors duration-200">
                    <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">New Entry</h3>
                <p className="text-gray-600 text-sm flex items-center justify-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Start writing your thoughts</span>
                </p>
            </div>
        </div>
    );
}

export default NewEntry;