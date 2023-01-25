import axios from "axios";
// BaseURL
import config from "@config/config.json";
// Common-Attributes-use-while-APIs-Call

const globalInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default globalInstance;
