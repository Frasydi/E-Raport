import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RoleRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    // cek role
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />; // buat halaman unauthorized
    }

    return children;
};

export default RoleRoute;
