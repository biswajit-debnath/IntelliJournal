import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, {params}: {params: Promise<{journalId: string}>}) => {
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

    const updatedAnalysis = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id
        },
        create: {
            entryId: updatedEntry.id,
            mood: analysis?.mood || '',
            summery: analysis?.summery || '',
            subject: analysis?.subject || '',
            color: analysis?.color || '#000000',
            negative: analysis?.negative || false
        },
        update: {
            mood: analysis?.mood || '',
            summery: analysis?.summery || '',
            subject: analysis?.subject || '',
            color: analysis?.color || '#000000',
            negative: analysis?.negative || false
        }
    })

    return NextResponse.json({data: {...updatedEntry, analysis: updatedAnalysis}});
}

export const GET = async (req: Request, {params}: {params: Promise<{journalId: string}>}) => {
    try {
        const {journalId} = await params;
        const user = await getUserByClerkId();
        
        const entry = await prisma.journalEntry.findUnique({
            where: {
                userId_id: {
                    userId: user.id,
                    id: journalId
                }
            },
            include: {
                analysis: true
            }
        });

        if (!entry) {
            return NextResponse.json(
                { error: 'Entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ entry });
    } catch (error) {
        console.error('Failed to fetch entry:', error);
        return NextResponse.json(
            { error: 'Failed to fetch entry' },
            { status: 500 }
        );
    }
}
