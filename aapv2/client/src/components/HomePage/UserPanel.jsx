import React from 'react';
import {useEffect,useState} from  "react";
import "./UserPanel.css"
import {Link} from "@reach/router"
import axios from 'axios';


const UserPanel = props => {
    const [session, setSession] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession([res.data.user[0]]);
            }
        });
    }, [session]);

    return (
        session ?
        <div>
            {
                session.map((s,k) => {
                    return (
                        <div className="card" key = {k}>
                            <img src={process.env.PUBLIC_URL+`${s.img_url}`} alt="" className="userpic"/>
                        <div className="container">
                            <h4><b>{s.first_name}</b> <b>{s.last_name}</b></h4>
                            <Link to={`/UPEdit/${s.id}`}>
                                Edit Profie
                            </Link>
                            <Link to="/upload">Upload profile picture</Link>
                        </div>
                        </div>
                        )
                })
            } 
        </div>
        : <h1>User logged out!</h1>
    )
}

export default UserPanel;