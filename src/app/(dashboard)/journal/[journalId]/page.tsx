import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (entryId) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
           userId_id: {
            userId: user.id,
            id: entryId
           }
        }
    })

    return entry;
}

const JournalEntryPage = async ({params}) => {
    const {journalId} = await params;
    const entry = await getEntry(journalId)
    return (
        <Editor entry ={entry}/>
    )
}

export default JournalEntryPage;