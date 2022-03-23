import React from 'react';
import {useEffect,useState} from  "react";
import axios from 'axios';
import {Link} from "@reach/router"
import "./UserHome.css"

const UserHome = props => {
    const [profiles, setProfiles]=useState([])
    const [session, setSession]=useState([])
    const[postPopUp,setPostPopUp] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0])
            }
        });
    }, [props]);



    return (
        <>
        {
        session ? 
        <div className="FullHome">
            <div className="UFHleftpannel">
                <ul className="UL">
                    <li>
                        user
                    </li>
                    <li>
                        shelters gg
                    </li>
                    <li>
                        pets
                    </li>
                </ul>
            </div>
            <div className="centerpannel">
                <div className="UFHnotfollowing">
                    <p>not following</p>
                </div>
                <div className="UFHpost">
                    <p>post</p>
                </div>
                <div className="UFHposts">
                    <p>Posts</p>
                </div>
            </div>
            <div className="UFHrightpannel">
            </div>
        </div>: !session
        }
        </>
    );
};


export default UserHome;