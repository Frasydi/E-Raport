import axios from "axios";
import { getAccessToken } from "./auth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
    withCredentials: true,
});

export const setupInterceptors = (getToken, setToken, onLogout) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (err) => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        (res) => res,
        async (err) => {
            const originalRequest = err.config;
            if (!navigator.onLine) {
                return Promise.reject(
                    new Error("Kamu sedang offline. Periksa koneksi internet.")
                );
            }

            // ✅ Kalau server unreachable (server mati)
            if (err.code === "ERR_NETWORK") {
                return Promise.reject(
                    new Error("Server tidak bisa dihubungi. Coba lagi nanti.")
                );
            }
            if (err.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newToken = await getAccessToken();
                    setToken(newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    onLogout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(err);
        }
    );
};

export default axiosInstance;
