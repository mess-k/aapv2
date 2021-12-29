import SP from "../../Shelter/Pannel/ShelterPanel"
import PP from "../../../Profile/Pannel/ProfilePannel"
import "../../../Profile/Page/Profile.css"
import {useEffect,useState} from  "react";
import axios from 'axios';
import {Link} from "@reach/router"



const Dashpage = props => {
    const {session} = props
    const [profiles, setProfiles]=useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setProfiles(res.data.profiles)
            }
        });
    }, [props]);


    return(
        session ?  
        <div>
            <div className="profileHeader">
                <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" className="petProfilePic"/>
                <h1 className="petName">{session.name}</h1>
                <div className="borderBottom"></div>
            </div>
            <div className="profileBody">
                <div className="leftPannel">
                    <div className="infoCard">
                        <div className="about">
                            <h4>About</h4>
                        </div>
                        <div className="info">
                            <h4>{session.email}</h4>
                            <button 
                            // profile = {profile}
                            className="btn btn-info" 
                            // onClick={EditProfileButton}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
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
                </div>
                <div className="rightPannel">
                    <div className="createPost">
                        <div className="postPic">
                            <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" />
                        </div>
                        <div className="postInput">
                            <button
                            // session={session}
                            // profile={profile}
                            // onClick={createPost}
                            >
                                Have anything to share?
                            </button>
                        </div>
                    </div>
                    {/* {
                    posts ?
                    <div className="postPannel">
                        {
                            posts.map((post,y) =>{
                                return(
                                    <div className="posts" key={y}>
                                        <div className="postpic">
                                            <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" />
                                        </div>
                                        <div className="postcontext">
                                            <p>
                                                {post.context}
                                            </p>
                                        </div>
                                        <div className="postimg">
                                            <img src={process.env.PUBLIC_URL+`${post.img_url}`} alt="" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>: !posts
                    } */}
                </div>
            </div>
        </div>
        
        : !session
        )
}

export default Dashpage