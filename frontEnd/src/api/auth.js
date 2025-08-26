import axios from "axios";

const baseAPI = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: true,
});

export const login = async (username, password) => {
    try {
        const res = await baseAPI.post("/auth/login", { username, password });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getAccessToken = async () => {
    const res = await baseAPI.get("/auth/token");
    return res.data.token;
};

export const logout = async ()=> {
    await baseAPI.post("/auth/logout")
}
