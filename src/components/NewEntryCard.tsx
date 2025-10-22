'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewEntry } from "@/utils/api";
import LoadingSpinner from "./ui/LoadingSpinner";

const NewEntry = () => {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const handleOnClick = async () => {
        if (isCreating) return; // Prevent double clicks
        
        setIsCreating(true);
        try {
            const entry = await createNewEntry();
            router.push(`/journal/${entry.id}`);
        } catch (error) {
            console.error('Failed to create new entry:', error);
            setIsCreating(false); // Reset loading state on error
        }
    };

    return (
        <div 
            className={`
                overflow-hidden rounded-lg shadow bg-white transition-all duration-200
                ${isCreating 
                    ? 'cursor-not-allowed opacity-75' 
                    : 'cursor-pointer hover:shadow-md hover:scale-105'
                }
            `}
        >
            <div className="px-4 py-5 flex items-center justify-center" onClick={handleOnClick}>
                {isCreating ? (
                    <div className="flex items-center gap-3">
                        <LoadingSpinner size="md" />
                        <span className="text-xl text-gray-600">Creating...</span>
                    </div>
                ) : (
                    <span className="text-3xl">New Entry</span>
                )}
            </div>
        </div>
    );
};


export default NewEntry;