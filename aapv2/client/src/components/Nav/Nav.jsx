import React from 'react';
import "./Nav.css";
import logo from "../../img/logo.png"
// import {useState, useEffect} from "react"

const Nav = props => {

    // const [session, setSession] = useState([]) 

    // useEffect(()=> {
        
    // },[session]);

    return (
        <>
        <div className="Nav">
            <a href="/home"><img src={logo} alt="" /></a>
            <a href="/login">Logout</a>
        </div>
        </>
    );
};

export default Nav;