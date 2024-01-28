import axios from "axios";

import { auth } from "../fir";

export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

appAxios.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err),
);
