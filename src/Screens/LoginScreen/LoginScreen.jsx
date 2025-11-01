import React, { use, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../../services/authService";
import useFetch from "../../hook/useFetch";
import useForm from "../../hook/useForm";
import { AuthContext } from "../../Context/AuthContext";
import "./LoginScreen.css";

const LoginScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { onLogin } = useContext(AuthContext);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const from = query.get("from");
        if (from === "verified_email") {
            setTimeout(() => {}, 100);
        }
    }, [location]);

    const LOGIN_FORM_FIELDS = {
        EMAIL: "email",
        PASSWORD: "password",
    };

    const initial_form_state = {
        [LOGIN_FORM_FIELDS.EMAIL]: "",
        [LOGIN_FORM_FIELDS.PASSWORD]: "",
    };

    const { response, loading, error, sendRequest, resetResponse } = useFetch();

    const handleLogin = (form_state_sent) => {
        resetResponse();
        sendRequest(() => {
            return login(
                form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
                form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
            );
        });
    };

    const { form_state, onInputChange, handleSubmit, resetForm } = useForm(
        initial_form_state,
        handleLogin
    );

    useEffect(() => {
        if (response && response.ok) {
            onLogin(response.body.token);
        }
    }, [response]);

    return (
        <div className="login-screen">
            <div
                className={`notification-container ${error ? "show" : ""} ${
                    response && response.ok ? "show success" : ""
                }`}
            >
                <div className="notification-content">
                    {error && (
                        <div className="notification error">
                            <span className="notification-message">
                                {error}
                            </span>
                        </div>
                    )}
                    {response && response.ok && (
                        <div className="notification success">
                            <span className="notification-message">
                                Login successful! Redirecting...
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`notification-container ${
                    location.search.includes("verified_email")
                        ? "show success"
                        : ""
                }`}
            >
                <div className="notification-content">
                    {location.search.includes("verified_email") && (
                        <div className="notification success">
                            <span className="notification-message">
                                Email verified successfully! You can now login.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="login-form-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="email-container">
                        <label htmlFor="email" className="email-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name={[LOGIN_FORM_FIELDS.EMAIL]}
                            id={"email"}
                            value={form_state[LOGIN_FORM_FIELDS.EMAIL]}
                            onChange={onInputChange}
                            className="email-input"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password" className="password-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name={[LOGIN_FORM_FIELDS.PASSWORD]}
                            id={"password"}
                            value={form_state[LOGIN_FORM_FIELDS.PASSWORD]}
                            onChange={onInputChange}
                            className="password-input"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="button-container">
                        {loading ? (
                            <button disabled className="login-button">
                                Logging In...
                            </button>
                        ) : (
                            <button className="login-button">Login</button>
                        )}
                    </div>
                </form>
                <div className="login-footer">
                    <span className="login-footer-text">Create an account</span>
                    <a
                        onClick={() => navigate("/register")}
                        className="login-footer-link"
                    >
                        Register here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
