import ENVIRONMENT from "../config/environment";

export async function getChannelList(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspaces/${workspace_id}/channels`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at get channels");
    }
    return response;
}

export async function createChannel(workspace_id, channel_name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspaces/${workspace_id}/channels`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: channel_name,
            }),
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at create channel");
    }
    return response;
}

export async function deleteChannel(workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            `/api/workspaces/${workspace_id}/channels/${channel_id}/delete`,
        {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at delete channel");
    }
    return response;
}

export async function editChannel(workspace_id, channel_id, new_name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            `/api/workspaces/${workspace_id}/channels/${channel_id}/update`,
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
        throw new Error("Error at edit channel");
    }
    return response;
}
