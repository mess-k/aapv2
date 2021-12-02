import React from 'react';
import "./css/SPNav.css";
import logo from "../../img/logo.png"

const Nav = props => {


    return (
        <>
        <div className="SPNav">
            <a href="/dashboard"><img src={logo} alt="" className="NavImg" /></a>
            <a href="/login">Logout</a>
        </div>
        </>
    );
};

export default Nav;