import React from 'react';
import "./css/SPNav.css";
import logo from "../../img/logo.png"
import axios from 'axios';
import { navigate } from '@reach/router';

const Nav = props => {

    const LogOut = e =>{
        axios.get("http://localhost:8000/api/user/logout")
        .then((res) => {
            
                navigate("/")
            
        })
    }

    return (
        <>
        <div className="Nav">
            <a href="/UFBHome"><img src={logo} alt="" className="NavImg"/></a>
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