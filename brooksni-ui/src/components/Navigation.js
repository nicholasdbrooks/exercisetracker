import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="nav-bar">
            <Link className='link-nav' to='/'>Home</Link>
            <br />
            <Link className='link-nav' to='/create'>Create</Link>
        </nav>
    );
};

export default Navigation;