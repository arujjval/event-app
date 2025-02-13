import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    id: string;
    title: string;
    about: string;
    on_date: string; 
    on_time: string; 
    streamer: string; 
    tags?: string[];
    status: "UPCOMING" | "LIVE" | "ENDED";
    stream_platform: "Youtube" | "Twitch";
    link: string;
    created_at?: Date;
    updated_at?: Date;
}

const EventSchema : Schema = new mongoose.Schema({
    title: { type: String, required: true },
    about: { type: String, required: true },
    on_date: { type: String, required: true }, 
    on_time: { type: String, required: true }, 
    streamer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String] },
    status: { type: String, enum: ["UPCOMING", "LIVE", "ENDED"], required: true },
    stream_platform: { type: String, enum: ["Youtube", "Twitch"], required: true },
    link: { type: String, required: true },
  }, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);