import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5028"
});

export default api;