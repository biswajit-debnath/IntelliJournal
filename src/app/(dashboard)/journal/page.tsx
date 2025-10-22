import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import JournalsList from "@/components/JournalsList";

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

    // Convert Date objects to strings for client components
    const serializedEntries = journalEntries.map(entry => ({
        ...entry,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
        analysis: entry.analysis ? {
            ...entry.analysis,
            createdAt: entry.analysis.createdAt.toISOString(),
            updatedAt: entry.analysis.updatedAt.toISOString()
        } : null
    }));

    return <JournalsList initialEntries={serializedEntries} />;
}

export default journalPage;