import { MAIN_API_KEY } from "./api_key";
import { Request,Response } from "express";

export const validateApiKey = (req: Request, res: Response, next: Function) => {

    const { body: data } = req;

    const apiKey: string = data.headers["api-key"]

    // as long as the request provide the main key, grant them the access
    if (apiKey == MAIN_API_KEY) return next()

    if (!apiKey) {
        res.status(400)
        return res.send({ error: "API key is required" })
    }

    return next()
}