import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntry from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import Question from "@/components/Question"
import { BookOpen } from "lucide-react";

const getEntries = async () => {
    try {
        const user = await getUserByClerkId();

        const entries = await prisma.journalEntry.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                analysis: true
            }
        });

        return entries;
    } catch (error) {
        // During build or when auth fails, return empty array
        console.log("Auth error during build:", error);
        return [];
    }
}

const journalPage = async () => {
    const journalEntries = await getEntries();
    console.log("Journals:",  journalEntries);

    return (
        <div className="min-h-full bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <BookOpen className="h-8 w-8 text-gray-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Your Journals</h1>
                    </div>
                    <p className="text-gray-600">Reflect on your thoughts and track your emotional journey</p>
                </div>

                {/* Question Component */}
                <div className="mb-8">
                    <Question />
                </div>

                {/* Journal Entries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewEntry />
                    {journalEntries.map((entry) => (
                        <Link href={`/journal/${entry.id}`} key={entry.id}>
                            <EntryCard entry={entry} />
                        </Link>
                    ))}
                </div>

                {journalEntries.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No journal entries yet</h3>
                        <p className="text-gray-600">Start your journaling journey by creating your first entry</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default journalPage;