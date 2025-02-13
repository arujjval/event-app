import mongoose, { Document, Schema } from 'mongoose';

export interface IEventUser extends Document {
    streamer: string; 
    event: string; 
    saved: boolean;
    registered: boolean;
    creator: boolean;
}

const EventUserSchema : Schema = new mongoose.Schema({
    streamer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    saved: { type: Boolean, default: false },
    registered: { type: Boolean, default: false },
    creator: { type: Boolean, required: true },
}, { timestamps: true });

export default mongoose.model<IEventUser>('EventUser', EventUserSchema);