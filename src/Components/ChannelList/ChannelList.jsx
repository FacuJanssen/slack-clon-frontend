import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import {
    createChannel,
    getChannelList,
    deleteChannel,
    editChannel,
} from "../../services/channelService";
import useFetch from "../../hook/useFetch";
import "./ChannelList.css";
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

const ChannelList = ({ channel_list, onChannelUpdate }) => {
    const { workspace_id } = useParams();
    const { response, loading, error, sendRequest } = useFetch();
    const createNewChannel = () => {
        const channel_name = prompt("Enter channel name");
        if (channel_name) {
            sendRequest(() => createChannel(workspace_id, channel_name)).then(
                () => {
                    if (onChannelUpdate) {
                        onChannelUpdate();
                    }
                }
            );
        }
    };
    const handleEditChannel = (id_workspace, channel_id, current_name) => {
        const new_name = prompt(
            "Enter new name for the workspace: " + current_name,
            current_name
        );
        if (new_name) {
            sendRequest(() =>
                editChannel(id_workspace, channel_id, new_name)
            ).then(() => {
                if (onChannelUpdate) {
                    onChannelUpdate();
                }
            });
        }
    };
    const handleDeleteChannel = (id_workspace, channel_id) => {
        sendRequest(() => deleteChannel(id_workspace, channel_id)).then(() => {
            if (onChannelUpdate) {
                onChannelUpdate();
            }
        });
    };
    console.log(response, loading, error);
    return (
        <div className="channel-list-container">
            <button onClick={createNewChannel} className="create-channel">
                Create Channel
            </button>
            {channel_list.length === 0 ? (
                <span className="no-channels">No channels</span>
            ) : (
                <div className="channel-list">
                    {channel_list.map((channel) => (
                        <div key={channel._id} className="channel-list-item">
                            <Link
                                to={`/workspace/${workspace_id}/channel/${channel._id}`}
                                className="channel-list-link"
                            >
                                {channel.name}
                            </Link>
                            <div className="channel-actions">
                                <RiEdit2Fill
                                    onClick={() =>
                                        handleEditChannel(
                                            workspace_id,
                                            channel._id,
                                            channel.name
                                        )
                                    }
                                />
                                <AiOutlineDelete
                                    onClick={() =>
                                        handleDeleteChannel(
                                            workspace_id,
                                            channel._id
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChannelList;
