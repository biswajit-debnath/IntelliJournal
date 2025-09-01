import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
    const user = await currentUser();

    // Check in the db if user exists
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id as string,

        }
    })

    if(!match) {
        await prisma.user.create({
            data: {
                clerkId: user?.id as string,
                email: user?.emailAddresses[0].emailAddress
            }
        })
    }

    redirect('/journal')

}

const NewUserPage = async () => {
    await createNewUser()
    return <p> New User Page</p>
};


export default NewUserPage;