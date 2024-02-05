import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedLevel }) => {
    const {auth} = useAuth();
    console.log(allowedLevel);

    return(
        auth?.userLevel === allowedLevel
            ? <Outlet/>
            : <Navigate to='/'/>
    )
}

export default RequireAuth;