import { Navigate } from "react-router-dom";
import {ReactNode, useContext} from "react";
import {useAuth} from "../../context/AuthContext";

type PrivateRouteProps = {
    children: ReactNode;
};

function PrivateRoute({ children }:PrivateRouteProps) {
    const { user } = useAuth();


    if (!user) {
        return <Navigate to="/inloggen" replace />;
    }

    return children;
}

export default PrivateRoute;