'use client';
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntry =() => {
    const router = useRouter();
    const handleOnClick = async () => {
        const entry = await createNewEntry();
        router.push(`/journal/${entry.id}`)
    }
    return (
    <div className="overflow-hidden cursor-pointer bg-white rounded-lg shadow">
        <div className="px-4 py-5" onClick={handleOnClick}>
            <span className="text-3xl">New Entry</span>
        </div>
    </div>);
}


export default NewEntry;