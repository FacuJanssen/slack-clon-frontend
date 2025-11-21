import ENVIRONMENT from "../config/environment";

export async function getWorkspaces() {
    const response_http = await fetch(ENVIRONMENT.URL_API + "/api/workspaces", {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at get workspaces");
    }
    return response;
}
export async function createWorkspace(workspace_name) {
    const response_http = await fetch(ENVIRONMENT.URL_API + "/api/workspaces", {
        method: "POST",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: workspace_name,
        }),
    });
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at create workspace");
    }
    return response;
}

export async function editWorkspace(workspace_id, new_name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspaces/${workspace_id}/update`,
        {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: new_name,
            }),
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at edit workspace");
    }
    return response;
}

export async function deleteWorkspace(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspaces/${workspace_id}/delete`,
        {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at delete workspace");
    }
    return response;
}
