import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import { getWorkspaces } from "../../services/workspaceService";
import { Link } from "react-router";
import "./HomeScreen.css";

const HomeScreen = () => {
    const { response, loading, error, sendRequest } = useFetch();
    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);
    console.log(response, loading, error);

    return (
        <div className="HomeScreen">
            <h1 className="home-title">Workspaces</h1>
            {loading ? (
                <span className="loading">Loading workspaces...</span>
            ) : (
                <div className="workspaces-container">
                    {response &&
                        response.data.workspaces.map((workspace) => {
                            return (
                                <div
                                    key={workspace.workspace_id}
                                    className="workspace"
                                >
                                    <h2 className="workspace-name">
                                        {workspace.workspace_name}
                                    </h2>
                                    <Link
                                        to={
                                            "/workspace/" +
                                            workspace.workspace_id
                                        }
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
