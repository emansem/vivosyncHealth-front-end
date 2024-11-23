"use client";

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5740/api",
});

// Safely get token from localStorage with error handling
const getToken = () => {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
        return token ? JSON.parse(token) : null;
    } catch (error) {
        console.error('Error parsing token:', error);
        return null;
    }
};

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { api };

