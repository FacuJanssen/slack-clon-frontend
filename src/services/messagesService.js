import ENVIRONMENT from "../config/environment";

async function getMessagesByChannelId(workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            `/api/workspaces/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at get messages by channel id");
    }
    return response;
}

async function createMessage(workspace_id, channel_id, messageContent) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
            `/api/workspaces/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: messageContent.trim(),
            }),
        }
    );

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error("Error at create message");
    }
    return response;
}

export { getMessagesByChannelId, createMessage };
