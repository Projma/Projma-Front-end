// import Axios from 'axios';
import axios from 'axios';
import { baseUrl } from "./constants"

// const apiInstance = Axios.create({
const apiInstance = axios.create({
    baseURL: baseUrl
});

apiInstance.interceptors.request.use(
    config => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = 'JWT ' + access_token; // Bearer
        }
        return config;
    },
    // config.headers['Content-Type'] = 'application/json';
    error => Promise.reject(error)
);

apiInstance.interceptors.response.use(
    res => {
        return res; // response
    },
    async error => {
        if (error.response) {
            const originalConfig = error.config;
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                // axios
                // .post(`${baseUrl}/accounts/jwt/refresh`, {
                apiInstance
                    .post(`accounts/jwt/refresh`, {
                        refresh: localStorage.getItem('refresh_token'),
                    })
                    .then(res => {
                        localStorage.setItem('access_token', res.access);
                        localStorage.setItem('refresh_token', res.refresh);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
                return apiInstance(originalConfig);
            }
        }

        return Promise.reject(error);
    }
);

export default apiInstance;