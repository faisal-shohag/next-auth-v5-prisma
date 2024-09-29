"use server"

import { auth, unstable_update } from "@/auth"
import prisma from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validation"
import { revalidatePath } from "next/cache";



export async function updateProfile(values){
    const session = await auth()
    const userId = session?.user?.id;

    if(!userId) {
        throw new Error("Unauthorized")
    }
    

    const { name } = updateProfileSchema.parse(values)
    

     const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name }
    })
 
    revalidatePath('/')
    return updatedUser
}