import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setUser(null);
            setIsLoggedIn(false);
            return;
        }
        const user = decodeToken(localStorage.getItem("token"));
        if (user) {
            setUser(user);
            setIsLoggedIn(true);
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);
    const onLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/login");
    };
    const onLogin = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        const user_session = decodeToken(token);
        setUser(user_session);
        navigate("/home");
    };
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
