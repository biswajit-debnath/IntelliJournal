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
        },
        include: {
            analysis: true
        }
    })

    return entry;
}

const JournalEntryPage = async ({params}) => {
    const {journalId} = await params;
    const entry = await getEntry(journalId);
    const {summery, subject, mood, negative, color} = entry?.analysis;
    const analysisDataStructure = [
        {name: "Summery", value: summery},
        {name: "Subject", value: subject},
        {name: "Mood", value: mood},
        {name: "Negative", value: negative ? "True" : "False"}
    ]
    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry ={entry}/>
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{backgroundColor: color}}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {
                            analysisDataStructure.map(item=> 
                                <li key={item.name} className="px-4 py-6 flex justify-between border-b border-black/10">
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JournalEntryPage;