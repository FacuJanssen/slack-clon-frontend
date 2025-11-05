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

async function createChannel(workspace_id, channel_name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspaces/${workspace_id}/channels`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: channel_name,
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at create channel");
    }
    return response;
}
