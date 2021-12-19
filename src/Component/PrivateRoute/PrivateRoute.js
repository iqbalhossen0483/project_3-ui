import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";

const PrivateRoute = ({ element }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    }

    return user.email ? element : <Navigate to="/log-in" state={{ from: location }}></Navigate>

};

export default PrivateRoute;