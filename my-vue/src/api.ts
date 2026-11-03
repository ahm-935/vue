import axios from "axios";

export const baseUrl = 'http://lara-project-api.test/';
export const baseUrlApi = `${baseUrl}api/`;

export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("vue-tkn");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);