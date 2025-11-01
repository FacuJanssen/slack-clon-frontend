import ENVIRONMENT from "../config/environment";

export async function getWorkspaces() {
    const response_http = await fetch(ENVIRONMENT.URL_API + "/api/workspaces", {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response_http.ok) {
        throw new Error("Error at get workspaces");
    }
    const response = await response_http.json();
    return response;
}
