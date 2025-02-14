import { Response, Request } from "express";
import { eventUserSchema, IEventUser } from "../schema";
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const handleEventUser = async (req: Request, res: Response) => {
    try {
        const { 
            event, 
            streamer, 
            saved = false, 
            registered = false, 
            creator = false 
        } = req.body;

        if (!event || !streamer) {
            res.status(400).json({ message: "Event ID and User ID are required" });
            return;
        }

        const existingEventUser = await eventUserSchema.findOne({ event, streamer });

        if (existingEventUser) {
            existingEventUser.saved = !!saved;
            existingEventUser.registered = !!registered;
            existingEventUser.creator = !!creator;

            const updatedResponse = await existingEventUser.save();

            if (!updatedResponse) {
                res.status(400).json({ message: "EventUser update failed" });
            }

            res.status(200).json({ message: "EventUser updated successfully" });
        } 
        else 
        {
            const newEventUser: IEventUser = new eventUserSchema({
                event,
                streamer,
                saved: !!saved,
                registered: !!registered,
                creator: !!creator
            });

            const response = await newEventUser.save();

            if (!response) {
                res.status(400).json({ message: "EventUser creation failed" });
            }

            res.status(200).json({ message: "EventUser created successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


