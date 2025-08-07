import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
    getAccessToken,
    logout as apiLogout,
    login as loginApi,
} from "../api/auth";
import { setupInterceptors } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessTokenRef = useRef(null);
    const navigate = useNavigate();

    const logout = async () => {
        await apiLogout();
        setAccessToken(null);
        accessTokenRef.current = null;
        setUser(null);
        localStorage.clear()
        navigate("/login");
    };

    const login = async (username, password) => {
        try {
            const res = await loginApi(username, password);
            const token = res.accessToken;

            setAccessToken(token);
            accessTokenRef.current = token;

            const decoded = jwtDecode(token);
            setUser({
                id: decoded.id,
                username: decoded.username,
                role: decoded.role,
            });

            setupInterceptors(
                () => accessTokenRef.current,
                (newToken) => {
                    setAccessToken(newToken);
                    accessTokenRef.current = newToken;
                },
                logout
            );

            return { success: true, role: decoded.role };
        } catch (err) {
            return {
                success: false,
                error: err?.response?.data?.message || "Login gagal.",
            };
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);
                accessTokenRef.current = token;

                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id,
                    username: decoded.username,
                    role: decoded.role,
                });

                setupInterceptors(
                    () => accessTokenRef.current,
                    (newToken) => {
                        setAccessToken(newToken);
                        accessTokenRef.current = newToken;
                    },
                    logout
                );
            } catch (err) {
                console.warn("Tidak ada token saat init, user belum login.");
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    if (loading) {
        return <div className="text-center mt-20">🔐 Memuat sesi login...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                setUser,
                login, // ✅ expose login function
                logout, // ✅ expose logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
