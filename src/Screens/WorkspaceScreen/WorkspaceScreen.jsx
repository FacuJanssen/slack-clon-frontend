import React from "react";
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar";
import NavBar from "../../Components/NavBar/NavBar";
import "./WorkspaceScreen.css";
import ChannelDetail from "../../Components/ChannelDetail/ChannelDetail";

const WorkspaceScreen = () => {
    return (
        <div className="workspace-screen">
            <NavBar className="nav-bar" />
            <div className="workspace-container">
                <ChannelSidebar className="channel-sidebar" />
                <ChannelDetail className="channel-detail" />
            </div>
        </div>
    );
};

export default WorkspaceScreen;
