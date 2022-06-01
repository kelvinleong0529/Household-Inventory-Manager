import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import { db } from "../../db";

const FIVE_MINUTES: number = 5 * 60 * 1000
const REQUEST_PER_MS: number = 20;

export const getItemLimit = rateLimit({
    windowMs: FIVE_MINUTES,
    max: REQUEST_PER_MS
})

export const getItem = async (req: Request, res: Response) => {
    const user_id: number = res.locals.user_id
    const item = await db.select().where({ user_id: user_id }).from("item");
    res.json(item);
}