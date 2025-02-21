import api from "../api";

export const createEvent = async (
    title: string, 
    about: string, 
    on_date: string, 
    on_time: string, 
    streamer: string, 
    tags: string[], 
    status: string, 
    stream_platform: string, 
    link: string
) => {
    try {
        const response = await api.post('/event/create', { 
            title, 
            about, 
            on_date, 
            on_time, 
            streamer, 
            tags, 
            status, 
            stream_platform, 
            link 
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        return console.log(error);
    }
}

export const getLatestEvents = async () => {
    try {
        const response = await api.get('/event/latest', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getEventById = async (id: string) => {
    try {
        console.log(id);
        const response = await api.get(`/event/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}



