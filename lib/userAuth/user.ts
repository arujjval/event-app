import axios from "axios";
import api from "../api";

export const signUp = async (username: string, email: string, password: string) => {
    try {
        const response = await api.post('/user/sign-in', { username, email, password }, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        return console.log(error);
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/user/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        return console.log(error);
    }
}