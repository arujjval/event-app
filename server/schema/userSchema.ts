import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    profile_picture?: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);