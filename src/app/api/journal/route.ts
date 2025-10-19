import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
    const user = await getUserByClerkId();
    const content = 'Write about your day';

    const entry = await prisma.journalEntry.create({
        data : {
            userId: user.id,
            content: 'Write about your day'
        }
    });

    const analysis = await analyze(content);
    let analysisCreation;
    
    if(analysis) {
        analysisCreation = await prisma.analysis.create({
        data: {
            entryId: entry.id,
            ...analysis
        }
    })
    }

    revalidatePath("/journal");

    return NextResponse.json({
        data: {
            ...entry,
            analysis: analysisCreation
        },
        limitExceeded: !analysis // Flag to indicate if the limit was exceeded
    });


}