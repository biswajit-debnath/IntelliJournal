import { auth } from '@clerk/nextjs/server';
import { prisma } from "./db";

export const getUserByClerkId = async () => {
    try {
        const { userId } = await auth();
        
        // If no userId, throw error
        if (!userId) {
            throw new Error('No user ID found');
        }

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                clerkId : userId
            }
        });

        return user;
    } catch (error) {
        console.log('Auth error:', error);
        throw error;
    }
}