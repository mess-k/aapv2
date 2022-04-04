import React from 'react';
import {useEffect,useState} from  "react";
import axios from 'axios';
import {Link} from "@reach/router"
import "./UserHome.css"
import LCL from "../../Profile/Page/L_C_List"
import Comment from "../../Profile/Page/Comment"

const UserHome = props => {
    const [profiles, setProfiles]=useState([])
    const [session, setSession]=useState([])
    const[postPopUp,setPostPopUp] = useState(false)
    const[notFollow, setNotFollow]= useState([])
    const[followPosts,setFollowPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0])
            }
        });
    }, [props]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/following/posts")
            .then(res => {
                setFollowPosts(res.data)
            })
    },[props])
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/user/notfollowing")
            .then(res => {
                setNotFollow(res.data)
            })
    },[props])

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
                    <div className="notcontainer">
                    {
                        notFollow.map((not,i)=>{
                            return(
                                <div className="singleNotfollow" key={i}>
                                    <Link to={`/profile/view/${not.proID}`}
                                        profile={not}
                                        session={session}
                                        className="singleNotfollow"
                                    >
                                        <div className="notPic" key={i}>
                                            <img src={process.env.PUBLIC_URL+`${not.img_url}`} alt="" />
                                        </div>
                                        <div className="notName">
                                            <h5>{not.name}</h5>
                                        </div>
                                    </Link>
                                    </div>
                            )
                        })
                    }
                    </div>
                </div>
                    <div className="who">
                        <h2>Check out these pets!</h2>
                    </div>
                <div className="UFHpost">
                        <div className="postPic">
                            <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" />
                        </div>
                        <div className="postInput">
                            <button
                            session={session}
                            // profile={profile}
                            // onClick={createPost}
                            >
                                Have anything to share?
                            </button>
                        </div>
                </div>
                <div className="UFHposts">
                    {
                        followPosts.map((fp,k) =>{
                            return(
                                <div className="UHposts" key={k}>
                                    <div className="postpic">
                                        <Link to={`/profile/view/${fp.id}`}
                                            // profile={profile}
                                            session={session}
                                            className="postpic"
                                        >
                                        <img src={process.env.PUBLIC_URL+`${fp.img_url}`} alt="" />
                                        <div>
                                            <p className='p'>{fp.name}</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="postcontext">
                                        <h5>
                                            {fp.context}
                                        </h5>
                                    </div>
                                    <div className="postimg">
                                        <img src={process.env.PUBLIC_URL+`${fp.post_url}`} alt="" />
                                    </div>
                                    <div className="like_comment">
                                        <LCL
                                        postID= {fp.post_id}
                                        sessionID={session.id}
                                        profile={fp.profile_id}
                                        className="UHPcomList"
                                        />
                                    </div>
                                    <div className="createComment">
                                        <div className="postcomments">
                                            <Comment
                                            postID={fp.post_id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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