import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const AuthMiddleware = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default AuthMiddleware;
