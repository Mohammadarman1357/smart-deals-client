import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    } else {
        return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
    }
    // if-> user exist return children

    // else -> navigate --> login
};

export default PrivateRoute;