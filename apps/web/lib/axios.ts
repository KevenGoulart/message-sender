import { env } from "@/services/env";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token-MS");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
