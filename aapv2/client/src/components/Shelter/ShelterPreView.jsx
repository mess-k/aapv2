import React from 'react';
// import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"
import Comment from "../Profile/Page/Comment"
import LCL from "../Profile/Page/L_C_List"
import Follow from "./SFollow"
import { Link } from '@reach/router';

const ShelterPreView = props => {
    const{shelter,posts,sid} = props
    const [session, setSession] = useState()
    const [sProfiles, setSProfiles] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);
    
    useEffect(() => {
        const s_ID = sid
        axios.get(`http://localhost:8000/api/profile/find/shelter`,{params:{id: s_ID}})
        .then((res) => {
                setSProfiles(res.data);
            
        });
    }, [sid]);

    console.log(sProfiles)

    
    return (
        shelter ? 
        <div>
            {
                shelter.map((p,k)=>{
                    return(
                        <div className="profile" key={k}>
                            <div className="profileHeader">
                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" className="petProfilePic"/>
                                <h1 className="petName">{p.name}</h1>
                                <Follow
                                proID = {p.id}
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
                                                <h5>{p.name}</h5>
                                                <h5>{p.email}</h5>
                                            </div>
                                        </div>
                                        <div className="propannelcontainer">
                                            {
                                                sProfiles.map((p,k) => {
                                                    return (
                                                        <div className="singlepro" key = {k}>
                                                            <Link to={`/profile/view/${p.id}`}
                                                            profiles={sProfiles}
                                                            session={session}
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
                                        {
                                        posts ?
                                        <div className="postPannel">
                                            {
                                                posts.map((post,y) =>{
                                                    return(
                                                        <div className="posts" key={y}>
                                                            <div className="postpic">
                                                                <>
                                                                {
                                                                post.PID === null ?
                                                                <Link to={`/shelter/view/${p.id}`}
                                                                    shelter={shelter}
                                                                    session={session}
                                                                    userViewID={post.u_id}
                                                                    className="postpic"
                                                                >
                                                                <img src={process.env.PUBLIC_URL+`${post.s_img_url}`} alt="" />
                                                                <div>
                                                                    <p className='p'>{post.s_name}</p>
                                                                </div>
                                                                </Link> :
                                                                <Link to={`/profile/view/${post.PID}`}
                                                                shelter={shelter}
                                                                session={session}
                                                                className="postpic"
                                                                >
                                                                <img src={process.env.PUBLIC_URL+`${post.p_img_url}`} alt="" />
                                                                <div>

                                                                <p className='p'>{post.p_name}</p>
                                                                </div>
                                                                </Link>
                                                                    }
                                                                    </>
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
                                                                postID= {post.post_id}
                                                                sessionID={session.id}
                                                                shelter={post.id}
                                                                className="posterPic"
                                                                />
                                                            </div>
                                                            <div className="createComment">
                                                                <div className="postcomments">
                                                                <Comment
                                                                postID={post.post_id}
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
                    )
                })
            }
        </div> : <h1>"Cant find info on this shelter sorry ):"</h1>
    );
};

export default ShelterPreView;
