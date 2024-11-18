"use client";
import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5740/api",
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { api };
