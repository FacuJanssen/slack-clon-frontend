import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import "./ChannelList.css";

const ChannelList = ({ channel_list }) => {
    const { workspace_id } = useParams();
    return (
        <div className="channel-list">
            {channel_list.length === 0 ? (
                <span className="no-channels">No channels</span>
            ) : (
                channel_list.map((channel) => {
                    return (
                        <Link
                            key={channel._id}
                            to={`/workspace/${workspace_id}/channel/${channel._id}`}
                            className="channel-list-item"
                        >
                            {channel.name}
                        </Link>
                    );
                })
            )}
        </div>
    );
};

export default ChannelList;
