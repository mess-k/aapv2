import React from 'react';
import "./Profile.css"
import {useState} from "react";
import Editpop from "../../Dashboard/Popups/EditProfile/EditProfile"
import CreatePost from "../../Dashboard/Popups/CreatePost/CreatePost"
import Comment from "../../Dashboard/Shelter/Page/SComment"
import LCL from "../../Dashboard/Shelter/Page/S_L_C_List"
import { Link } from '@reach/router';
// import axios from 'axios';

const Proflie = props => {
    const[editPopUp,setEditPopUp] = useState(false)
    const[postPopUp,setPostPopUp] = useState(false)
    const{profile,session,posts} = props
    
    console.log(posts)

    const EditProfileButton = (e)=>{
        setEditPopUp(prev => !prev)
    }
    const createPost = e =>{
        setPostPopUp(prev => !prev)
        console.log(postPopUp)
    }

    return (
        profile ? 
        <div>
            {
                profile.map((p,k)=>{
                    return(
                        <div className="profile" key={k}>
                            <Editpop
                            profile={profile}
                            editPopUp={editPopUp}
                            session={session}
                            />
                            <CreatePost
                            profile={profile}
                            session={session}
                            PostPopUp={postPopUp}
                            // closePopUp={closePopUp}
                            // PopUpRef={PopUpRef}
                            createPost={createPost}
                            />
                            <div className="profileHeader">
                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" className="petProfilePic"/>
                                <h1 className="petName">{p.name}</h1>
                                <div className="borderBottom"></div>
                            </div>
                            <div className="profileBody">
                                    <div className="leftPannel">
                                        <div className="infoCard">
                                            <div className="about">
                                                <h4>About</h4>
                                            </div>
                                            <div className="info">
                                                <h4>Age: {p.age}</h4>
                                                <h4>Type: {p.type}</h4>
                                                <h4>{p.description}</h4>
                                                <button 
                                                profile = {profile}
                                                className="btn btn-info" 
                                                onClick={EditProfileButton}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rightPannel">
                                        <div className="createPost">
                                            <div className="postPic">
                                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" />
                                            </div>
                                            <div className="postInput">
                                                <button
                                                session={session}
                                                profile={profile}
                                                onClick={createPost}>
                                                    Have anything to share?
                                                </button>
                                            </div>
                                        </div>
                                        {
                                        posts ?
                                        <div className="postPannel">
                                            {
                                                posts.map((post,y) =>{
                                                    return(
                                                        <div className="posts" key={y}>
                                                            <div className="postpic">
                                                                <Link to={`/profile/view/${p.id}`}
                                                                    profile={profile}
                                                                    session={session}
                                                                    className="postpic"
                                                                >
                                                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" />
                                                                <div>

                                                                <p className='p'>{p.name}</p>
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
                                                                // sessionID={session.id}
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
                    )
                })
            }
        </div> : <h1>"Cant find info on this pet sorry ):"</h1>
    );
}

export default Proflie;