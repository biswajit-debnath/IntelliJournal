'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NewEntry from './NewEntryCard';
import EntryCard from './EntryCard';
import SkeletonCard from './ui/SkeletonCard';
import Question from './Question';

interface JournalEntry {
  id: string;
  createdAt: string;
  content?: string;
  analysis?: {
    summary?: string;
    mood?: string;
  };
}

interface JournalsListProps {
  initialEntries?: JournalEntry[];
}

const JournalsList = ({ initialEntries = [] }: JournalsListProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEntries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/journal');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data.entries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entries');
      console.error('Failed to fetch entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // No automatic fetching - we rely on server-side data

  const renderSkeletons = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <div key={`skeleton-${i}`}>
        <SkeletonCard />
      </div>
    ));
  };

  if (error) {
    return (
      <div className="p-10 bg-zinc-400/20 h-full">
        <h2 className="text-3xl mb-2">Journals</h2>
        <div className="my-6">
          <Question />
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">Error loading journals: {error}</p>
          <button 
            onClick={refreshEntries}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-zinc-400/20 h-full">
      <h2 className="text-3xl mb-2">Journals</h2>
      <div className="my-6">
        <Question />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        
        {isLoading ? (
          renderSkeletons()
        ) : (
          entries.map((entry) => (
            <div key={entry.id}>
              <EntryCard entry={entry} />
            </div>
          ))
        )}
      </div>
      
      {!isLoading && entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No journal entries yet.</p>
          <p className="text-sm">Create your first entry to get started!</p>
        </div>
      )}
    </div>
  );
};

export default JournalsList;
