import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import { userSchema as User } from "../schema"; 
import { eventSchema as Event } from "../schema";
import { eventUserSchema as EventUser } from "../schema";
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

mongoose.connect(process.env.MONGO_ATLAS_URI!, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const seedDatabase = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        await Event.deleteMany({});
        await EventUser.deleteMany({});

        let users = [];
        for (let i = 0; i < 20; i++) {
            users.push(new User({
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                profile_picture: faker.image.avatar(),
            }));
        }
        users = await User.insertMany(users);

        let events = [];
        for (let i = 0; i < 20; i++) {
            events.push(new Event({
                title: faker.lorem.words(3),
                about: faker.lorem.sentence(),
                on_date: faker.date.future().toISOString().split("T")[0],
                on_time: `${String(faker.number.int({ min: 0, max: 23 })).padStart(2, '0')}:${String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0')}`,
                streamer: users[Math.floor(Math.random() * users.length)]._id,
                tags: faker.lorem.words(5).split(" "),
                status: faker.helpers.arrayElement(["UPCOMING", "LIVE", "ENDED"]),
                stream_platform: faker.helpers.arrayElement(["Youtube", "Twitch"]),
                link: faker.internet.url(),
            }));
        }
        events = await Event.insertMany(events);

        let eventUsers = [];
        for (let i = 0; i < 20; i++) {
            eventUsers.push(new EventUser({
                streamer: users[Math.floor(Math.random() * users.length)]._id,
                event: events[Math.floor(Math.random() * events.length)]._id,
                saved: faker.datatype.boolean(),
                registered: faker.datatype.boolean(),
                creator: faker.datatype.boolean(),
            }));
        }
        await EventUser.insertMany(eventUsers);

        console.log("Database seeded successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
