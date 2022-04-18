import React from 'react';
import "./css/Nav.css";
import logo from "../../img/logo.png"

const Nav = props => {

    return (
        <>
        <div className="Nav">
            <a href="/UFBHome"><img src={logo} alt="" className="NavImg"/></a>
            <a href="/login">Logout</a>
        </div>
        </>
    );
};

export default Nav;