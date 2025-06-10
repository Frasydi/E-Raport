import { useContext,createContext, useState, useEffect } from "react";
import { getAccessToken, logout as apiLogout } from "../api/auth";
import { setupInterceptors } from "../api/axiosInstance";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  let navigate = useNavigate();

  const logout = async () => {
    await apiLogout();
    setAccessToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch {
        setAccessToken(null);
        navigate("/login");
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    setupInterceptors(
      () => accessToken,
      setAccessToken,
      logout
    );
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
