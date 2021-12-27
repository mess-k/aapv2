import React from 'react';
import {useEffect,useState} from  "react";
import "./ProfilePannel.css"
import {Link} from "@reach/router"
import axios from 'axios';


const ProfilePannel = props => {
    const [session, setSession] = useState([])
    const [profiles, setProfiles]=useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession([res.data.shelter[0]]);
                setProfiles(res.data.profiles)
                // console.log(session)
                // console.log(profiles)
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