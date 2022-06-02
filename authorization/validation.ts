import { MAIN_API_KEY } from "./apiKey";
import { Request, Response } from "express";
import { isHashedValueKey, isHashedPassword } from "./hashing";
import { getUser } from "../routes/user/getUser";

import { db } from "../db";

export const validateApiKey = async (req: Request, res: Response, next: Function) => {

    const email: any = req.headers["email"]
    const password: any = req.headers["password"]
    const apiKey: any = req.headers["api-key"]

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

    const user = getUser(email)

    if (user.length === 0) return res.send({ error: `User doesn't exist! Please sign up at http://localhost:5000` })

    const hashedApiKey: string = user[0]["apiKey"]
    const hashedPassword: string = user[0]["password"]

    // pass the id to the next function through middleware
    res.locals.user_id = user[0]["id"]

    if (isHashedValueKey(apiKey, hashedApiKey) && isHashedPassword(password, hashedPassword)) {
        return next()
    } else {
        return res.send({ error: "Incorrect Credentials" })
    }
}