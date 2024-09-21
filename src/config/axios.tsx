import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.g-start-up.com/api/v1",
    withCredentials: true,
});
