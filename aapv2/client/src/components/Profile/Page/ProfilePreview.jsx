import React from 'react';
import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"
import Like from "./Like"
import Comment from "./Comment"
import ShowComponent from "./ShowComments"
// import TextareaAutosize from 'react-textarea-autosize';


const Proflie = props => {
    const{profile,posts} = props
    const [session, setSession] = useState()
    const [showCom, setShowCom] = useState(false)



    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);

    const ShowComs = (e) =>{
        e.preventDefault()
        setShowCom (prev => !prev)
    }



    return (
        profile ? 
        <div>
            {
                profile.map((p,k)=>{
                    return(
                        <div className="profile" key={k}>
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
                                                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" />
                                                            </div>
                                                            <div className="postcontext">
                                                                <p>
                                                                    {post.context}
                                                                </p>
                                                            </div>
                                                            <div className="postimg">
                                                                <img src={process.env.PUBLIC_URL+`${post.post_url}`} alt="" />
                                                            </div>
                                                            <div className="like_comment">
                                                                <Like
                                                                postID= {post.id}
                                                                sessionID={session.id}
                                                                profile={profile.id}
                                                                />
                                                                <div>
                                                                    <form onSubmit={ShowComs}>
                                                                        <input 
                                                                        type="submit" value="Comments" 
                                                                        className="L_C"
                                                                        />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className="createComment">
                                                                <div className="showcomments">
                                                                <ShowComponent
                                                                postID={post.id}
                                                                showCom={showCom}
                                                                />
                                                                </div>
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