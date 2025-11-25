import React, { use, useEffect } from "react";
import ChannelList from "../ChannelList/ChannelList";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router";
import { getChannelList } from "../../services/channelService";
import "./ChannelSidebar.css";

const ChannelSidebar = () => {
    const { response, loading, error, sendRequest } = useFetch();
    const { workspace_id } = useParams();
    function loadChannelList() {
        sendRequest(async () => await getChannelList(workspace_id));
    }
    useEffect(() => {
        loadChannelList();
    }, [workspace_id]);
    return (
        <aside className="channel-sidebar">
            <h2 className="channel-sidebar-title">Channels</h2>
            {loading && (
                <span className="loading-channels">Loading channels...</span>
            )}
            {error && <span className="error-channels">{error}</span>}
            {response && (
                <ChannelList
                    channel_list={response.data.channels}
                    className="channel-list"
                    onChannelUpdate={loadChannelList}
                />
            )}
        </aside>
    );
};

export default ChannelSidebar;
