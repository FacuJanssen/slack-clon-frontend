import React from "react";
import "./NavBar.css";
import { Link } from "react-router";
import { FaForumbee } from "react-icons/fa";

const NavBar = () => {
    return (
        <div className="nav-bar ">
            <Link to="/home" className="nav-bar-title">
                <FaForumbee className="icon" />
                Hive
            </Link>
        </div>
    );
};

export default NavBar;
