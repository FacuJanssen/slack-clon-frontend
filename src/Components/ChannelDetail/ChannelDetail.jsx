import React, { useEffect, useState } from "react";
import {
    getMessagesByChannelId,
    createMessage,
} from "../../services/messagesService";
import { useParams } from "react-router";
import useFetch from "../../hook/useFetch";
import "./ChannelDetail.css";

const ChannelDetail = () => {
    const { workspace_id, channel_id } = useParams();
    const { response, loading, error, sendRequest } = useFetch();
    const [message, setMessage] = useState("");
    const [sendLoading, setSendLoading] = useState(false);
    async function loadMessagesList(channel_id) {
        sendRequest(
            async () => await getMessagesByChannelId(workspace_id, channel_id)
        );
    }
    useEffect(() => {
        if (channel_id && channel_id !== "undefined") {
            loadMessagesList(channel_id);
        }
    }, [channel_id]);
    const handleSendMessage = async (event) => {
        event.preventDefault();
        setSendLoading(true);
        try {
            await createMessage(workspace_id, channel_id, message.trim());
            setMessage("");
            await loadMessagesList(channel_id);
        } catch (error) {
            console.error("Error at send message", error);
        } finally {
            setSendLoading(false);
        }
    };
    if (!channel_id)
        return (
            <div className="channel-detail">
                <span className="no-channel">
                    Select a channel to see messages
                </span>
            </div>
        );
    return (
        <div className="channel-detail">
            {loading && (
                <span className="loading-messages">Loading messages...</span>
            )}
            {error && <span className="error-messages">{error}</span>}
            {response && (
                <div className="messages-container">
                    {response.data.messages.messages.length === 0 ? (
                        <span className="no-messages">
                            No messages yet. Start the conversation!
                        </span>
                    ) : (
                        response.data.messages.messages.map((message) => (
                            <div
                                key={message._id}
                                className="message-container"
                            >
                                <span className="message-user">
                                    {message.user_email}
                                </span>
                                <div className="message-content">
                                    <span className="message">
                                        {message.message_content}
                                    </span>
                                    <span className="message-time">
                                        {message.created_at_time}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <form
                className="message-input-container"
                onSubmit={handleSendMessage}
            >
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="message-input"
                        name="message-input"
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={sendLoading}
                    />
                    <button
                        type="submit"
                        className="send-button"
                        disabled={sendLoading || !message.trim()}
                    >
                        {sendLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    ); /* (
        <div className="channel-detail">
            {loading && (
                <span className="loading-messages">Loading messages...</span>
            )}
            {error && <span className="error-messages">{error}</span>}
            {response && (
                <div className="messages-container">
                    {!channel_id ? (
                        <span className="no-channel-selected">
                            Select a channel to see messages
                        </span>
                    ) : response.data.messages.messages.length === 0 ? (
                        <span className="no-messages">No messages</span>
                    ) : (
                        response.data.messages.messages.map((message) => (
                            <div
                                key={message._id}
                                className="message-container"
                            >
                                <span className="message-user">
                                    {message.user_email}
                                </span>
                                <div className="message-content">
                                    <span className="message">
                                        {message.message_content}
                                    </span>
                                    <span className="message-time">
                                        {message.created_at_time}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <form
                className="message-input-container"
                onSubmit={handleSendMessage}
            >
                <label htmlFor="message-input">Enter message</label>
                <input
                    type="text"
                    placeholder="Enter message"
                    className="message-input"
                    name="message-input"
                    id="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    ); */
};

export default ChannelDetail;
