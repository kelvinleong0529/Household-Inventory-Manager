import { db } from "../../db";


export const getUser = async (email: string) => {
    try {
        return await db.select().where({ email: email }).from("user_credentials");
    }
    catch (error) {
        console.log(error)
    }
}