import React from 'react';
import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"
import Comment from "./Comment"
import LCL from "./L_C_List"
import Follow from "./Follow"
import { Link } from '@reach/router';

const Proflie = props => {
    const{profile,posts,sID,session} = props
    const [shelter, setShelter] = useState([])
    
    useEffect(() => {
        const SID = sID
        axios.get(`http://localhost:8000/api/shelter/find`,{params:{id: SID}})
        .then((res) => {
            setShelter(res.data);
        });
    }, [sID]);
    
    return (
        profile ? 
        <div>
            <div className="profile" >
                <div className="profileHeader">
                    <Link to={`/profile/view/${profile.id}`}
                        profile={profile}
                        session={session}
                        className="profileHeader"
                    >
                    <img src={process.env.PUBLIC_URL+`${profile.img_url}`} alt="" className="petProfilePic"/>
                    <h1 className="petName">{profile.name}</h1>
                    </Link>
                    <Follow
                    proID = {profile.id}
                    sessionID = {session.id}
                    />
                    <div className="borderBottom"></div>
                </div>
                <div className="profileBody">
                        <div className="leftPannel">
                            <div className="infoCard">
                                <div className="about">
                                    <h5>Bio</h5>
                                </div>
                                <div className="info">
                                    <h5>Age: {profile.age}</h5>
                                    <h5>Type: {profile.type}</h5>
                                    <h5>{profile.description}</h5>
                                    {
                                        shelter.map((s,i) =>{
                                            return(
                                                <div className="SContact" key={i}>
                                                    <Link to={`/shelter/view/${s.id}`}
                                                        shelter={s}
                                                        sID={s.id}
                                                        session={session}
                                                        className="singleNotfollow"
                                                    >
                                                    <div className="notName">
                                                        <h5>{s.email}</h5>
                                                    </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="rightPannel">
                            {
                            posts ?
                            <div className="postPannel">
                                {
                                    posts.map((post,y) =>{
                                        return(
                                            <div className="posts" key={y}>
                                                <div className="postpic">
                                                    <Link to={`/profile/view/${profile.id}`}
                                                        profile={profile}
                                                        session={session}
                                                        className="postpic"
                                                    >
                                                    <img src={process.env.PUBLIC_URL+`${profile.img_url}`} alt="" />
                                                    <div>

                                                    <p className='p'>{profile.name}</p>
                                                    </div>
                                                    </Link>
                                                </div>
                                                <div className="postcontext">
                                                    <h5>
                                                        {post.context}
                                                    </h5>
                                                </div>
                                                <div className="postimg">
                                                    <img src={process.env.PUBLIC_URL+`${post.post_url}`} alt="" />
                                                </div>
                                                <div className="like_comment">
                                                    <LCL
                                                    postID= {post.id}
                                                    sessionID={session.id}
                                                    profile={profile.id}
                                                    className="posterPic"
                                                    />
                                                </div>
                                                <div className="createComment">
                                                    <div className="postcomments">
                                                    <Comment
                                                    postID={post.id}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>: !posts
                            }
                        </div>
                </div>
            </div>
        </div> :  <h1>"Cant find info on this pet sorry ):"</h1>
    )
}

export default Proflie;
