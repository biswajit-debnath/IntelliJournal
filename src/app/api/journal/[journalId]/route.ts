import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}) => {
    const {journalId} = await params;
    const {content} = await req.json();
    const user = await getUserByClerkId();
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: journalId
            }
        },
        data: {
            content
        }
    })

    const analysis = await analyze(content);
    let updatedAnalysis = null;

    if(analysis) {
        updatedAnalysis = await prisma.analysis.upsert({
            create: {
                entryId : updatedEntry.id,
                ...analysis
            },
            update: {
                ...analysis
            },
            where: {
                entryId: updatedEntry.id
            }
        })
    }

    return NextResponse.json({
        data: {...updatedEntry, analysis: updatedAnalysis},
        limitExceeded: !analysis
    });
}
