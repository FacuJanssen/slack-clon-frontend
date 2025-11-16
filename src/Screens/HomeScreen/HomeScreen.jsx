import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import { getWorkspaces } from "../../services/workspaceService";
import { Link } from "react-router";
import "./HomeScreen.css";
import NavBar from "../../Components/NavBar/NavBar";

const HomeScreen = () => {
    const { response, loading, error, sendRequest } = useFetch();
    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);

    return (
        <div className="HomeScreen">
            <NavBar className="nav-bar" />
            <div className="home-title-container">
                <h1 className="home-title">Workspaces</h1>
                <i className="bi bi-plus-square-fill"></i>
            </div>
            {loading ? (
                <span className="loading">Loading workspaces...</span>
            ) : (
                <div className="workspaces-container">
                    {response &&
                        response.data.workspaces.map((workspace) => {
                            return (
                                <div key={workspace._id} className="workspace">
                                    <h2 className="workspace-name">
                                        {workspace.name}
                                    </h2>
                                    <Link
                                        to={"/workspace/" + workspace._id}
                                        className="workspace-link"
                                    >
                                        Open Workspace
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
