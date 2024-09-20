import axios from "axios";

export const api = axios.create({
    baseURL: "https://52.78.171.52/api/v1",
    withCredentials: true,
});
