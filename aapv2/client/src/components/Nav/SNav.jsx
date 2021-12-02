import React from 'react';
import "./css/Nav.css";
import logo from "../../img/logo.png"
// import {useState, useEffect} from "react"

const Nav = props => {

    // const [session, setSession] = useState([]) 

    // useEffect(()=> {
        
    // },[session]);

    return (
        <>
        <div className="Nav">
            <a href="/dashboard"><img src={logo} alt="" className="NavImg" /></a>
            <a href="/login">Logout</a>
        </div>
        </>
    );
};

export default Nav;