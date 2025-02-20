import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, 
});

export default api;