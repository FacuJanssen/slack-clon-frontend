import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { createChannel, getChannelList } from "../../services/channelService";
import useFetch from "../../hook/useFetch";
import "./ChannelList.css";

const ChannelList = ({ channel_list }) => {
    const { workspace_id } = useParams();
    const { response, loading, error, sendRequest } = useFetch();
    const createNewChannel = () => {
        const channel_name = prompt("Enter channel name");
        if (channel_name) {
            sendRequest(() => createChannel(workspace_id, channel_name)).then(
                () => {
                    sendRequest(() => getChannelList(workspace_id));
                }
            );
        }
    };
    return (
        <div className="channel-list-container">
            <button onClick={createNewChannel} className="create-channel">
                Create Channel
            </button>
            {loading && (
                <span className="loading-channels">Loading channels...</span>
            )}
            {response && (
                <div className="channel-list">
                    {response.data.channels.length === 0 ? (
                        <span className="no-channels">No channels</span>
                    ) : (
                        response.data.channels.map((channel) => (
                            <div className="channel-list-item">
                                <Link
                                    key={channel._id}
                                    to={`/workspace/${workspace_id}/channel/${channel._id}`}
                                    className="channel-list-item-link"
                                >
                                    {channel.name}
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ChannelList;
