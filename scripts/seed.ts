import { db } from "../db";

export const seedUserCredentialsTable = async () => {
    try {
        await db("users_credentials").insert({ email: "zhinsheng" });
        await db("users_credentials").insert({ email: "Jane Doe" });
        console.log("Added dummy user credentials!");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}