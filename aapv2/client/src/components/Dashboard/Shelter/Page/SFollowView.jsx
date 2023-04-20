import React from 'react';
import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"
import Comment from "./Comment"
import LCL from "./S_L_C_List"
import Follow from "./Follow"
import { Link } from '@reach/router';

const SFollowView = props => {
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
                    <Link to={`/shelter/view/${profile.id}`}
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
                                    <h5>About</h5>
                                </div>
                                <div className="info">
                                    <h5>{profile.name}</h5>
                                    <h5>{profile.email}</h5>
                                    {
                                        shelter.map((s,a) =>{
                                            return(
                                                <div className="SContact" key={a}>
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
                            posts.map((post,z) =>{
                                return(
                                    <>
                                    {
                                    post.PID === null ?
                                    <div className="posts" key={z}>
                                        <div className="postpic" >
                                        <Link to={`/shelter/view/${profile.id}`}
                                            className="postpic"
                                            >
                                            <img src={post.p_img_url ? post.p_img_url : post.s_img_url} alt="" />
                                            <p>{post.p_name ? post.p_name : post.s_name}</p>
                                            </Link>
                                        </div>
                                        <div className="postcontext"  >
                                            <h5>
                                                {post.context}
                                            </h5>
                                        </div>
                                        <div className="postimg" >
                                            <img src={process.env.PUBLIC_URL+`${post.post_url}`} alt="" />
                                        </div>
                                        <div className="like_comment" >
                                            <LCL
                                            postID= {post.post_id}
                                            sessionID={session.id}
                                            profile={session.id}
                                            className="posterPic"
                                            />
                                        </div>
                                        <div className="createComment" >
                                            <div className="postcomments" >
                                            <Comment
                                                postID={post.post_id}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="posts" key={z} >
                                        <div className="postpic">
                                        <Link to={`/pet/profile/${post.PID}`}
                                            className="postpic"
                                            >
                                            <img src={post.p_img_url ? post.p_img_url : session.img_url} alt="" />
                                            <p>{post.p_name ? post.p_name : session.name}</p>
                                            </Link>
                                        </div>
                                        <div className="postcontext">
                                            <h5>
                                                {post.context}
                                            </h5>
                                        </div>
                                        <div className="postimg" >
                                            <img src={process.env.PUBLIC_URL+`${post.post_url}`} alt="" />
                                        </div>
                                        <div className="like_comment" >
                                            <LCL
                                            postID= {post.post_id}
                                            sessionID={session.id}
                                            profile={session.id}
                                            className="posterPic"
                                            />
                                        </div>
                                        <div className="createComment" >
                                            <div className="postcomments" >
                                            <Comment
                                                postID={post.post_id}
                                                session={session}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    </>
                                )
                            })
                        }
                    </div>: !posts
                            }
                        </div>
                </div>
            </div>
        </div> :  <h1>"Cant find info on this shelter sorry ):"</h1>
    )
}

export default SFollowView ;
