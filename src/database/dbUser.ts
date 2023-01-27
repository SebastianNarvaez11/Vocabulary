import { UserModel } from "@/models"
import { db } from "./"

export const existUserById = async (_id: string): Promise<Boolean> => {

    await db.connect()
    const user = await UserModel.findById(_id).lean()
    await db.disconnect()

    if(!user) return false

    return true
}