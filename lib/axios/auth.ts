import axios from 'axios';
import api from './api';

export const signIn = async (username: string, email: string, password: string) => {
    try {
        const response = await api.post('/users/sign-in', { username, email, password });
        return response.data; 
    } catch (error) {
        console.error('Error making new account:', error);
        throw error;
    }
};
 
export const getUsers = async () => {
    try {
        const response = await api.post('/users/get-users');
        return response.data; 
    } catch (error) {
        console.error('Error making new account:', error);
        throw error;
    }
} 

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/users/login', { email, password });
        return response.data; 
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};
  