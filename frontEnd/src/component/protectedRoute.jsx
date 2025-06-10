import { Navigate } from "react-router";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
    const { accessToken, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
