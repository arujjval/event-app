import { Response, Request } from "express";
import { eventSchema, IEvent } from "../schema";
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const createEvent = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
