'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Editor from './Editor';
import LoadingSpinner from './ui/LoadingSpinner';

interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  analysis?: {
    summary?: string;
    mood?: string;
    subject?: string;
    negative?: boolean;
  };
}

interface JournalEntryLoaderProps {
  initialEntry?: JournalEntry | null;
}

const JournalEntryLoader = ({ initialEntry }: JournalEntryLoaderProps) => {
  const params = useParams();
  const [entry, setEntry] = useState<JournalEntry | null>(initialEntry || null);
  const [isLoading, setIsLoading] = useState(!initialEntry);
  const [error, setError] = useState<string | null>(null);

  const fetchEntry = async (entryId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/journal/${entryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entry');
      }
      const data = await response.json();
      setEntry(data.entry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load entry');
      console.error('Failed to fetch entry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if no initial entry provided
    if (!initialEntry && params.journalId) {
      fetchEntry(params.journalId as string);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading journal entry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => params.journalId && fetchEntry(params.journalId as string)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-gray-600">Entry not found</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};

export default JournalEntryLoader;
