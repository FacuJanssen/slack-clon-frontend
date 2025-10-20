import React, { useEffect } from "react";
import useForm from "../../hook/useForm";
import { register } from "../../services/authService";
import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router";
import "./RegisterScreen.css";

const RegisterScreen = () => {
    const navigate = useNavigate();

    const REGISTER_FORM_FIELDS = {
        USERNAME: "username",
        EMAIL: "email",
        PASSWORD: "password",
    };

    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: "",
        [REGISTER_FORM_FIELDS.EMAIL]: "",
        [REGISTER_FORM_FIELDS.PASSWORD]: "",
    };

    const { response, loading, error, sendRequest } = useFetch();

    const onRegister = (form_state_sent) => {
        sendRequest(() =>
            register(
                form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
            )
        );
    };

    const { form_state, onInputChange, handleSubmit, resetForm } = useForm(
        initial_form_state,
        onRegister
    );

    return (
        <div className="register-screen">
            <div
                className={`notification-container ${error ? "show" : ""} ${
                    response ? "show success" : ""
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
                    {response && (
                        <div className="notification success">
                            <span className="notification-message">
                                User registered successfully! Verify your email
                                to activate your account.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="register-form-container">
                <h2 className="register-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="username-container">
                        <label htmlFor="username" className="username-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id={"username"}
                            name={REGISTER_FORM_FIELDS.USERNAME}
                            value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                            onChange={onInputChange}
                            required
                            className="username-input"
                            placeholder="Username"
                        />
                    </div>
                    <div className="email-container">
                        <label htmlFor="email" className="email-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id={"email"}
                            name={REGISTER_FORM_FIELDS.EMAIL}
                            value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                            onChange={onInputChange}
                            required
                            className="email-input"
                            placeholder="Email"
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password" className="password-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id={"password"}
                            name={REGISTER_FORM_FIELDS.PASSWORD}
                            value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                            onChange={onInputChange}
                            required
                            className="password-input"
                            placeholder="Password"
                        />
                    </div>

                    <div className="button-container">
                        {loading ? (
                            <button disabled className="login-button">
                                Registering...
                            </button>
                        ) : (
                            <button className="login-button">Register</button>
                        )}
                    </div>
                </form>
                <div className="register-footer">
                    <span className="register-footer-text">
                        Already have an account?
                    </span>
                    <a
                        onClick={() => navigate("/login")}
                        className="register-footer-link"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
