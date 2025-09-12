import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import NewEntry from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";

const getEntries = async () => {
    const user = await getUserByClerkId();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return entries;
}

const journalPage = async () => {
    const journalEntries = await getEntries();
    console.log("Journals:",  journalEntries);

    return (
        <div className="p-10 bg-zinc-400/20 h-full">
            <h2 className="text-3xl mb-2">Journals</h2>
            <div className="grid grid-cols-3 gap-4">
                <NewEntry />
                {journalEntries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                ))}

            </div>
        </div>
    )
}

export default journalPage;