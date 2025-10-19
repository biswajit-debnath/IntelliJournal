'use client';
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewEntry =() => {
    const router = useRouter();
    const handleOnClick = async () => {
        const result = await createNewEntry();
        
        if(result.limitExceeded) {
            toast.error("AI API limit exceeded. Journal created without analysis. Please ask admin for increase.");
        }
        
        router.push(`/journal/${result.entry.id}`)
    }
    return (
    <div className="overflow-hidden cursor-pointer bg-white rounded-lg shadow">
        <div className="px-4 py-5" onClick={handleOnClick}>
            <span className="text-3xl">New Entry</span>
        </div>
    </div>);
}


export default NewEntry;