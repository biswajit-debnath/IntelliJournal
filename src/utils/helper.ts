import { getUserByClerkId } from "./auth";
import { prisma } from "./db"


export const checkAndUpdateAIAPILimit = (callback) => async (...args) => {
    const user = await getUserByClerkId();
    if(user.openAIApiHitCount >= user.openAIApiLimit) {
        // Return null instead of throwing an error
        return null;
    }

    // Increment the API hit count
    await prisma.user.update({
        data: {
            openAIApiHitCount: {
                increment: 1
            }
        },
        where:{
            id: user.id
        }
    })

    return await callback(...args);
}


