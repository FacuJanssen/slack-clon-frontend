import ENVIRONMENT from "../config/environment";

export async function register(username, email, password) {
    try {
        const body = {
            name: username,
            email,
            password,
        };
        const response_http = await fetch(
            ENVIRONMENT.URL_API + "/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        const response = await response_http.json();
        return response;
    } catch (error) {
        console.error("Register error", error);
        throw new Error("Internal server error on register");
    }
}

export async function login(email, password) {
    try {
        const body = {
            email,
            password,
        };
        const response_http = await fetch(
            ENVIRONMENT.URL_API + "/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        const response = await response_http.json();
        return response;
    } catch (error) {
        console.error("Login error", error);
        throw new Error("Internal server error on login");
    }
}
