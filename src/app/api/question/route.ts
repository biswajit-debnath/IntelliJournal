import { askQuestion } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
    const { question } = await req.json();
    const user = await getUserByClerkId();

    const userJournals = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        select: {
            id: true,
            content: true,
            createdAt: true
        }
    });

    const qaResponse = await askQuestion(userJournals, question);
    if(!qaResponse) {
        return NextResponse.json({
            data: null,
            limitExceeded: true
        })
    }

    return NextResponse.json({
        data: qaResponse
    })
}

export {
    POST
}