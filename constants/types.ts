export type Event = {
    _id: string;
    title: string;
    about: string;
    on_date: string;
    on_time: string;
    streamer: {
        id: string;
        username: string;
        profile_picture?: string;
    };
    tags?: string[];
    status: "UPCOMING" | "LIVE" | "ENDED";
    stream_platform: "Youtube" | "Twitch";
    link: string;
    created_at?: Date;
    updated_at?: Date;
}

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    profile_picture?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type EventUser = {
    _id: string;
    streamer: string;
    event: string;
    saved: boolean;
    registered: boolean;
    creator: boolean;
    created_at?: Date;
    updated_at?: Date;
}