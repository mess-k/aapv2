import React from 'react';
// import {useEffect,useState} from  "react";
import "./ShelterPanel.css"
import {Link} from "@reach/router"
// import axios from 'axios';

const ShelterPanel = props => {
    const {session} = props

    return (
        session ?
            <div className="card" >
                <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" className="pannelpic"/>
                <div className="container">
                    <h4>{session.name}</h4>
                    <Link to={`/SPEdit/${session.id}`}
                    session={session}>
                        Edit Profie
                    </Link>
                    <Link to="/sUpload">Upload profile picture</Link>
                    <Link to="/createprofile">Create a profile</Link>
                </div>
            </div>
        : <h1>User logged out!</h1>
    )
}

export default ShelterPanel;