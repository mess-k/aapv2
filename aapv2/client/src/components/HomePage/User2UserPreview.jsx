import React from 'react';
// import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"
import LCL from "../Profile/Page/L_C_List"
import Comment from "../Profile/Page/Comment"
// import Follow from "./SFollow"
import { Link } from '@reach/router';

const U2U = props => {
    const{posts,sid,profile,userViewID} = props
    const [session, setSession] = useState()
    const [profiles, setProfiles]=useState([])
    const [puser, setPuser]=useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);

    useEffect(() => {
        const UID = 22
        axios.get(`http://localhost:8000/api/user/find`,{params:{id: UID}})
        .then((res) => {
                setPuser(res.data.user[0]);
            
        });
    }, [sid]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/find/profiles/follow`)
        .then((res) => {
                setProfiles(res.data)
        });
    }, [props]);

    console.log(puser)
    console.log(userViewID)

    
    return (
        sid ? 
        <div>
            {
            puser.map((p,k)=>{
                return(
                    <div className="profile" key={k}>
                        <div className="profileHeader">
                            <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" className="petProfilePic"/>
                            <h1 className="petName">{p.name}</h1>
                            {/* <Follow
                            proID = {p.id}
                            sessionID = {session.id}
                            /> */}
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
                                            profiles.map((p,k) => {
                                                return (
                                                    <div className="singlepro" key = {k}>
                                                        <Link to={`/profile/view/${p.id}`}
                                                        profiles={profiles}
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
                                                        <Link to={"/home"}
                                                        className="postpic"
                                                        >
                                                            <img src={post.img_url ? post.img_url : session.img_url} alt="" />
                                                            <div>
                                                            <p>{session.first_name}</p>
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
                                                        // profile={profile.id}
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
                )
                })
            }
        </div> : <h1>"Cant find info on this User sorry ):"</h1>
    );
};

export default U2U;
