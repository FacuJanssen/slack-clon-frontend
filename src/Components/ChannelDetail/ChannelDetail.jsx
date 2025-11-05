import React, { useEffect } from "react";
import { getMessagesByChannelId } from "../../services/messagesService";
import { useParams } from "react-router";
import useFetch from "../../hook/useFetch";

const ChannelDetail = () => {
    const { workspace_id, channel_id } = useParams();
    if (!channel_id)
        return (
            <div>
                <h1>Channel not found</h1>
            </div>
        );
    const { response, loading, error, sendRequest } = useFetch();
    async function loadMessagesList(channel_id) {
        sendRequest(
            async () => await getMessagesByChannelId(workspace_id, channel_id)
        );
    }
    useEffect(() => {
        loadMessagesList(channel_id);
    }, [channel_id]);
    console.log(response, loading, error);
    return (
        <div>
            {loading && <span>Loading messages...</span>}
            {error && <span>{error}</span>}
            {response && (
                <div>
                    {response.data.messages.messages.length === 0 ? (
                        <span>No messages</span>
                    ) : (
                        response.data.messages.messages.map((message) => {
                            return (
                                <div key={message.id}>
                                    {message.message_content}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default ChannelDetail;
