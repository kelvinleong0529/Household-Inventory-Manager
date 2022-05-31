import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import { GetItem } from "../../interfaces/getItem";
import { db } from "../../db";

const FIVE_MINUTES: number = 5 * 60 * 1000
const REQUEST_PER_MS: number = 20;

export const getItemLimit = rateLimit({
    windowMs: FIVE_MINUTES,
    max: REQUEST_PER_MS
})

export const getItem = async (req: Request, res: Response) => {
    const queryUser: GetItem = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        age: req.body.age
    }
    const users = await db.select().where({ id: queryUser["id"] }).from("users");
    res.json(users);
}