import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

import { NewItem } from "../../interfaces/newItem";
import { db } from "../../db";

const FIVE_MINUTES: number = 5 * 60 * 1000
const REQUEST_PER_MS: number = 20;

export const createItemLimit = rateLimit({
    windowMs: FIVE_MINUTES,
    max: REQUEST_PER_MS
})

export const validateItem = (req: Request, res: Response, next: Function) => {

    const { body: data } = req;

    if (!data.item_name) {
        res.status(400)
        return res.send({ error: "Item name is required" })
    }

    if (!data.item_category) {
        res.status(400)
        return res.send({ error: "Item category is required" })
    }

    if (!data.current_quantity) {
        res.status(400)
        return res.send({ error: "Item current quantity is required" })
    }

    return next()
}

export const createItem = async (req: Request, res: Response) => {
    try {

        const user_id: number = res.locals.user_id;
        const item_name: string = req.body.item_name;
        const item_category: string = req.body.item_category;
        const current_quantity: number = req.body.current_quantity;
        const alert_quantity: number = req.body.alert_quantity;
        const expiry_date: Date = req.body.expiry_date;

        const NewItem: NewItem = {
            user_id: user_id,
            item_name: item_name,
            item_category: item_category,
            current_quantity: current_quantity,
            alert_quantity: alert_quantity,
            expiry_date: expiry_date,
        }

        const item = await db("item").insert(NewItem).returning("*");
        res.json({ item: item });
    }
    catch (error) {
        console.log(error)
    }
}