import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();
    return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
