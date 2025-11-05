import React from "react";
import { Route, Routes } from "react-router";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import "./App.css";
import WorkspaceScreen from "./Screens/WorkspaceScreen/WorkspaceScreen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route element={<AuthMiddleware />}>
                    <Route path="/home" element={<HomeScreen />} />
                    <Route
                        path="/workspace/:workspace_id"
                        element={<WorkspaceScreen />}
                    />
                    <Route
                        path="/workspace/:workspace_id/channel/:channel_id"
                        element={<WorkspaceScreen />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
