import { Response, Request } from "express";
import { userSchema, IUser } from "../schema";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config({ path: `${__dirname}/../../.env` });

export const signIn = async (req: Request, res: Response) => {
    try {
        const { username, email, password, profile_picture = null } = req.body;

        const newUser: IUser = new userSchema({
            username,
            email,
            password,
            profile_picture
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        const isMatch = user!.password === password;

        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { username: user!.username, email: user!.email },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const editProfile = async (req: Request, res: Response) => {
    try {
        const { email, username, profilePicture } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.profile_picture = profilePicture || user.profile_picture;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}