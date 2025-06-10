import { useContext, createContext, useState, useEffect } from "react";
import { getAccessToken, logout as apiLogout } from "../api/auth";
import { setupInterceptors } from "../api/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true); // ← tambahkan ini
    const navigate = useNavigate();

    const logout = async () => {
        await apiLogout();
        setAccessToken(null);
        navigate("/login");
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessToken();
                console.log("Fetched token:", token);
                setAccessToken(token);
            } catch {
                setAccessToken(null); // jangan redirect di sini
            } finally {
                setLoading(false); // ← token check selesai
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (!loading) {
            setupInterceptors(() => accessToken, setAccessToken, logout);
        }
    }, [accessToken, loading]);

    return (
        <AuthContext.Provider
            value={{ accessToken, setAccessToken, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
