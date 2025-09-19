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

    return NextResponse.json({data: updatedEntry});
}
