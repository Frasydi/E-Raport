import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

export const login = async (username, password) => {
    try {
        const res = await baseAPI.post("/auth/login", { username, password });
        console.log("res login: ", res)
        return res.data;
    } catch (error) {
        console.log("error login: ", error)
        throw error;
    }
};

export const getAccessToken = async () => {
    const res = await baseAPI.get("/auth/token");
    console.log("accessToken: ", res.data)
    return res.data.token;
};

export const logout = async ()=> {
    await baseAPI.post("/auth/logout")
}
