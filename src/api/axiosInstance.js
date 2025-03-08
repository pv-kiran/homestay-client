import _axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorage';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import store from './../app/store';
import { clearAuth } from '../app/features/users/authSlice';


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

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(clearAuth());
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;