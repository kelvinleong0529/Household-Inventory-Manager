import { MAIN_API_KEY } from "./api_key";
import { Request, Response } from "express";
import { hash } from "./hashing";

import { db } from "../db";

export const validateApiKey = async (req: Request, res: Response, next: Function) => {

    const email: any = req.headers["email"]
    const password: any = req.headers["password"]
    const apiKey: any  = req.headers["api-key"]

    if (!email) {
        res.status(400)
        return res.send({ error: "Email is required" })
    }

    if (!password) {
        res.status(400)
        return res.send({ error: "Password is required" })
    }

    // as long as the request provide the main key, grant them the access
    if (apiKey == MAIN_API_KEY) return next()

    if (!apiKey) {
        res.status(400)
        return res.send({ error: "API key is required" })
    }

    const user = await db.select().where({ email: email }).from("users_credentials");
    const hashedApiKey: string = user[0]["apiKey"]
    const hashedPassword: string = user[0]["password"]

    if (hash(apiKey) === hashedApiKey && hash(password) === hashedPassword) {
        return next()
    } else {
        return res.send({ error: "Incorrect Credentials" })
    }
}