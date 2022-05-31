import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import { NewItem } from "../../interfaces/newItem";
import { db } from "../../db";

const FIVE_MINUTES: number = 5 * 60 * 1000
const REQUEST_PER_MS: number = 20;

export const createPostLimit = rateLimit({
    windowMs: FIVE_MINUTES,
    max: REQUEST_PER_MS
})

export const validatePost = (req: Request, res: Response, next: Function) => {

    const { body: data } = req;

    if (!data.name) {
        res.status(400)
        return res.send({ error: "Name is required" })
    }

    if (!data.country) {
        res.status(400)
        return res.send({ error: "Country is required" })
    }

    return next()
}

export const createPost = async (req: Request, res: Response) => {
    try {

        const NewItem: NewItem = {
            name: req.body.name,
            country: req.body.country,
            age: req.body.age,
        }

        const user = await db("users").insert(NewItem).returning("*");
        res.json({ user: user });
    }
    catch (error) {
        console.log(error)
    }
}