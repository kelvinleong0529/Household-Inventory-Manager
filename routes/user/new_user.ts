import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import { NewUser } from "../../interfaces/newUser";
import { db } from "../../db";
import { generateApiKey, hash } from "../../authorization/hashing";

const FIVE_MINUTES: number = 5 * 60 * 1000
const REQUEST_PER_MS: number = 20;

export const createUserLimit = rateLimit({
    windowMs: FIVE_MINUTES,
    max: REQUEST_PER_MS
})

export const validateUser = (req: Request, res: Response, next: Function) => {

    const { body: data } = req;

    if (!data.email) {
        res.status(400)
        return res.send({ error: "Email is required" })
    }

    if (!data.password) {
        res.status(400)
        return res.send({ error: "Password is required" })
    }

    return next()
}

export const createUser = async (req: Request, res: Response) => {
    try {


        const apiKey: string = generateApiKey()
        const hashedApikey: string = hash(apiKey)

        const newUser: NewUser = {
            email: req.body.email,
            password: req.body.password,
            apiKey: hashedApikey
        }

        const user = await db("users_credentials").insert(newUser).returning("*");
        res.json({ api_key: hashedApikey });
    }
    catch (error) {
        console.log(error)
    }
}