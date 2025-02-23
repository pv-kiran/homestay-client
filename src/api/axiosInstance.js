import _axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorage';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = _axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            let token = getTokenFromLocalStorage();
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            return config;
        } catch (err) {
            return config;
        }
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;