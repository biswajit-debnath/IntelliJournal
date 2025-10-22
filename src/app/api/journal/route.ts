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

    const analysisCreation = await prisma.analysis.create({
        data: {
            entryId: entry.id,
            mood: analysis?.mood || '',
            summery: analysis?.summery || '',
            subject: analysis?.subject || '',
            color: analysis?.color || '#000000',
            negative: analysis?.negative || false
        }
    })

    revalidatePath("/journal");

    return NextResponse.json({
        data: {
            ...entry,
            analysis:analysisCreation 
        }
    });
}

export const GET = async () => {
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

        return NextResponse.json({
            entries
        });
    } catch (error) {
        console.error('Failed to fetch entries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch entries' },
            { status: 500 }
        );
    }
}