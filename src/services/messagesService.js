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

export { getMessagesByChannelId };
