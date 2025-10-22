'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './ui/LoadingSpinner';

interface EntryCardProps {
    entry: {
        id: string;
        createdAt: string;
        content?: string;
        analysis?: {
            summary?: string;
            mood?: string;
        };
    };
}

const EntryCard = ({ entry }: EntryCardProps) => {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const date = new Date(entry.createdAt).toDateString();

    const handleClick = async () => {
        if (isNavigating) return; // Prevent double clicks
        
        setIsNavigating(true);
        try {
            router.push(`/journal/${entry.id}`);
        } catch (error) {
            console.error('Navigation failed:', error);
            setIsNavigating(false);
        }
    };

    return (
        <div 
            className={`
                divide-y divide-gray-200 rounded-lg shadow bg-white overflow-hidden 
                transition-all duration-200 cursor-pointer
                ${isNavigating 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:shadow-md hover:scale-105'
                }
            `}
            onClick={handleClick}
        >
            <div className="px-4 py-5 flex items-center justify-between">
                <span>{date}</span>
                {isNavigating && <LoadingSpinner size="sm" />}
            </div>
            <div className="px-4 py-5">
                {isNavigating ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    entry.analysis?.summary || 'No summary available'
                )}
            </div>
            <div className="px-4 py-4">
                {isNavigating ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    entry.analysis?.mood || 'No mood analysis'
                )}
            </div>
        </div>
    );
};


export default EntryCard;