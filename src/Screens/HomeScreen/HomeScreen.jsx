import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import {
    getWorkspaces,
    createWorkspace,
    editWorkspace,
    deleteWorkspace,
} from "../../services/workspaceService";
import { Link } from "react-router";
import "./HomeScreen.css";
import NavBar from "../../Components/NavBar/NavBar";
import { RiEdit2Fill } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const HomeScreen = () => {
    const { response, loading, error, sendRequest } = useFetch();
    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);
    const handleCreateWorkspace = () => {
        sendRequest(() =>
            createWorkspace(`Workspace ${response.data.workspaces.length + 1}`)
        ).then(() => {
            sendRequest(() => getWorkspaces());
        });
    };
    const handleEditWorkspace = (workspace_id, current_name) => {
        const new_name = prompt(
            "Enter new name for the workspace: " + current_name,
            current_name
        );
        if (new_name) {
            sendRequest(() => editWorkspace(workspace_id, new_name)).then(
                () => {
                    sendRequest(() => getWorkspaces());
                }
            );
        }
    };
    const handleDeleteWorkspace = (workspace_id) => {
        sendRequest(() => deleteWorkspace(workspace_id)).then(() => {
            sendRequest(() => getWorkspaces());
        });
    };
    console.log(response, loading, error);
    return (
        <div className="HomeScreen">
            <NavBar className="nav-bar" />
            <div className="home-title-container">
                <h1 className="home-title">Workspaces</h1>
                <button
                    className="create-workspace-button"
                    onClick={handleCreateWorkspace}
                >
                    <BiMessageSquareAdd className="create-workspace-button" />
                </button>
            </div>
            {error && <span className="error">{error}</span>}
            {loading && <span className="loading">Loading workspaces...</span>}
            {response && (
                <div className="workspaces-container">
                    {response.data.workspaces.length === 0 ? (
                        <span className="no-workspaces">
                            You have no workspaces yet
                        </span>
                    ) : (
                        response.data.workspaces.map((workspace) => {
                            return (
                                <div key={workspace._id} className="workspace">
                                    <div className="workspace-header">
                                        <h2 className="workspace-name">
                                            {workspace.name}
                                        </h2>
                                        <div className="workspace-actions">
                                            <button
                                                onClick={() =>
                                                    handleEditWorkspace(
                                                        workspace._id,
                                                        workspace.name
                                                    )
                                                }
                                                className="edit-workspace-button"
                                            >
                                                <RiEdit2Fill />
                                            </button>
                                            <button
                                                className="delete-workspace-button"
                                                onClick={() =>
                                                    handleDeleteWorkspace(
                                                        workspace._id
                                                    )
                                                }
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                    <Link
                                        to={"/workspace/" + workspace._id}
                                        className="workspace-link"
                                    >
                                        Open Workspace
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
