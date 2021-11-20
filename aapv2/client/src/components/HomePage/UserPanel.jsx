import React from 'react';
import {useEffect} from  "react";
import "./UserPanel.css"
import {Link} from "@reach/router"


const UserPanel = props => {
    const {session} = props;


    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        session ?
            <div className="card">
                <img src="" alt="" />
            <div className="container">
                <h4><b>{session.first_name}</b> <b>{session.last_name}</b></h4>
                <Link to="/UPEdit">Edit Profie</Link>
                <Link to="/upload">Upload profile picture</Link>
            </div>
            </div> : <h1>Return to Login page</h1>
    );
}

export default UserPanel;