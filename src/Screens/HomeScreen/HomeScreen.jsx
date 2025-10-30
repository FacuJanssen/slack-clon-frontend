import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import { getWorkspaces } from "../../services/workspaceService";
import { Link } from "react-router";

const HomeScreen = () => {
    const { response, loading, error, sendRequest } = useFetch();
    useEffect(() => {
        sendRequest(() => getWorkspaces());
    }, []);
    console.log(response, loading, error);

    return (
        <div>
            <h1>Workspaces</h1>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    {response &&
                        response.data.workspaces.map((workspace) => {
                            return (
                                <div>
                                    <h2>{workspace.workspace_name}</h2>
                                    <Link
                                        to={
                                            "/workspace/" +
                                            workspace.workspace_id
                                        }
                                    >
                                        Open Workspaces
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
