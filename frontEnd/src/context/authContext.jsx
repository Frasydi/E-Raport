import { useContext, createContext, useState, useEffect, useRef } from "react";
import { getAccessToken, logout as apiLogout } from "../api/auth";
import { setupInterceptors } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const accessTokenRef = useRef(null); // ✅ token ref
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = async () => {
        await apiLogout();
        setAccessToken(null);
        accessTokenRef.current = null;
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);
                accessTokenRef.current = token; // ✅ simpan ke ref

                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id,
                    username: decoded.username,
                    role: decoded.role,
                });
            } catch (err) {
                console.error("Token fetch failed", err);
                setAccessToken(null);
                accessTokenRef.current = null;
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    // ⛔️ Jangan re-setup interceptor setiap token berubah
    useEffect(() => {
        if (!loading) {
            setupInterceptors(
                () => accessTokenRef.current, // ✅ ambil token terbaru dari ref
                (newToken) => {
                    setAccessToken(newToken);
                    accessTokenRef.current = newToken;
                },
                logout
            );
        }
    }, [loading]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                setAccessToken,
                logout,
                loading,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
