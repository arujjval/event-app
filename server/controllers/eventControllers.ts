import { Response, Request } from "express";
import { eventSchema, IEvent } from "../schema";
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { 
            title, 
            about, 
            on_date, 
            on_time, 
            streamer, 
            tags, 
            status, 
            stream_platform, 
            link 
        } = req.body;

        const newEvent: IEvent = new eventSchema({
            title,
            about,
            on_date,
            on_time,
            streamer,
            tags,
            status,
            stream_platform,
            link
        });

        const response = await newEvent.save();

        if(!response) {
            res.status(400).json({ message: "Event creation failed" });
        } 
            
        res.status(200).json({ message: "Event created successfully" }); 
    } catch (error) {
        console.log(error);
    }
}

export const updateEventStatus = async (req: Request, res: Response) => {
    try {
        const { id, newStatus } = req.body;

        const event = await eventSchema.findById(id);

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        event.status = newStatus;

        const response = await event.save();

        if (!response) {
            res.status(400).json({ message: "Event status update failed" });
        }

        res.status(200).json({ message: "Event status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getLatestEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventSchema
            .find()
            .sort({ createdAt: -1 })
            .limit(20);

        if (!events || events.length === 0) {
            res.status(404).json({ message: "No events found" });
            return;
        }

        res.status(200).json({ 
            message: "Events fetched successfully",
            data: events 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const event = await eventSchema.findById(id)
            .populate('streamer', 'username profile_picture');

        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }

        res.status(200).json({ 
            message: "Event fetched successfully",
            data: event 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


