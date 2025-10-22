import JournalEntryLoader from "@/components/JournalEntryLoader"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (entryId: string) => {
    try {
        const user = await getUserByClerkId()
        const entry = await prisma.journalEntry.findUnique({
            where: {
               userId_id: {
                userId: user.id,
                id: entryId
               }
            },
            include: {
                analysis: true
            }
        })

        return entry;
    } catch (error) {
        console.error('Failed to fetch entry:', error);
        return null;
    }
}

const JournalEntryPage = async ({params}: {params: Promise<{journalId: string}>}) => {
    const {journalId} = await params;
    const entry = await getEntry(journalId);
    
    // Convert Date objects to strings for client components
    const serializedEntry = entry ? {
        ...entry,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
        analysis: entry.analysis ? {
            ...entry.analysis,
            createdAt: entry.analysis.createdAt.toISOString(),
            updatedAt: entry.analysis.updatedAt.toISOString()
        } : null
    } : null;
    
    return <JournalEntryLoader initialEntry={serializedEntry} />;
}

export default JournalEntryPage;