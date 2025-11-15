import axios from "axios";
import { getItem } from "../utils/localStorage";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
});

api.interceptors.request.use((config) => {
    const token = getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});