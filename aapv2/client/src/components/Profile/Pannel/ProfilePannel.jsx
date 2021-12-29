import React from 'react';
import {useEffect,useState} from  "react";
import "./ProfilePannel.css"
import {Link} from "@reach/router"
import axios from 'axios';


const ProfilePannel = props => {
    const {session}=props
    const [profiles, setProfiles]=useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setProfiles(res.data.profiles)
            }
        });
    }, [props]);
    



    return (
        session ?
            <div className="propannelcontainer">
            {
                profiles.map((p,k) => {
                    return (
                        <div className="singlepro" key = {k}>
                            <Link to={`/pet/profile/${p.id}`}
                            profiles={profiles}
                            >
                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" className="profilepannelpic"/>
                                <h6>{p.name}</h6>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        : <h1>User logged out!</h1>
    )
}

export default ProfilePannel;