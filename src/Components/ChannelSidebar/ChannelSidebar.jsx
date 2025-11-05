import React, { use, useEffect } from "react";
import ChannelList from "../ChannelList/ChannelList";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router";
import { getChannelList } from "../../services/channelService";

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
        <aside>
            <h2>Channels</h2>
            {loading && <span>Loading channels...</span>}
            {response && <ChannelList channel_list={response.data.channels} />}
            {error && <span>{error}</span>}
        </aside>
    );
};

export default ChannelSidebar;
