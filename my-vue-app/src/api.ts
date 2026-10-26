import axios from "axios";

export const baseUrl = 'http://lara-project-api.test/';
export const baseUrlApi = `${baseUrl}api/`;

export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        'Content-Type': 'application/json',
    },
});