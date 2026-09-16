import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);


    if (!user) {
        return <Navigate to="/inloggen" replace />;
    }

    return children;
}

export default PrivateRoute;