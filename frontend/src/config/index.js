import axios from "axios";

// export const BASE_URL = "https://odoo-hackathon-project.onrender.com";
export const BASE_URL = "http://localhost:5000";

export const clientServer = axios.create({
    baseURL: BASE_URL,
});