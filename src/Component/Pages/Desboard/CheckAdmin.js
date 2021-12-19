import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hook/useAuth";

const CheckAdmin = ({ element }) => {
    const { user, isLoading, isAdmin } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    }

    return user.email && isAdmin ? element : <Navigate to="/" state={{ from: location }}></Navigate>

};

export default CheckAdmin;