import React from 'react';
import "./css/Nav.css";
import logo from "../../img/logo.png"
// import {useState, useEffect} from "react"
import axios from 'axios';
import { navigate } from '@reach/router';

const Nav = props => {

    // const [session, setSession] = useState([]) 

    // useEffect(()=> {
        
    // },[session]);

    const LogOut = e =>{
        axios.get("http://localhost:8000/api/user/logout")
        .then((res) => {
            
                navigate("/")
            
        })
    }

    return (
        <>
        <div className="Nav">
            <a href="/dashboard"><img src={logo} alt="" className="NavImg"/></a>
            <button
            className='logout'
            onClick={LogOut}
            >
            <p>Logout</p>
            </button>
        </div>
        </>
    );

};

export default Nav;