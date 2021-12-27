import React from 'react';
import "./Profile.css"
import {useState,useRef,useEffect} from "react";
import Editpop from "../../Popups/EditProfile/EditProfile"
import CreatePost from "../../Popups/CreatePost/CreatePost"
import axios from 'axios';

const Proflie = props => {
    const[editPopUp,setEditPopUp] = useState(false)
    const[postPopUp,setPostPopUp] = useState(false)
    const[posts,setPosts] = useState(false)
    const{profile,session} = props

    useEffect(() => {
        const profileID = props.profile[0].id
        axios.get('http://localhost:8000/api/profile/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data.posts)
        })
    },[props])

    const EditProfileButton = (e)=>{
        setEditPopUp(prev => !prev)
    }
    const createPost = e =>{
        setPostPopUp(prev => !prev)
        console.log(postPopUp)
    }
    const PopUpRef = useRef();
    
    const closePopUp = e =>{
        if(PopUpRef.current === e.target) {
            setPostPopUp(false)
        }
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
                            closePopUp={closePopUp}
                            PopUpRef={PopUpRef}
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
                                                <>
                                                </>
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
                                        <div className="posts">
                                            
                                        </div>
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