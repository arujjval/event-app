import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signUp = async ({ username, email, password } : { username: string, email: string, password: string }) => {
    try {
        console.log(username, email, password)
        const response = await api.post('/user/sign-in', { username, email, password }, {
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

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/user/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });



        await AsyncStorage.setItem('user', response!.data.token);

        console.log(response.data);

        return response.data
    } catch (error) {
        return console.log(error);
    }
}