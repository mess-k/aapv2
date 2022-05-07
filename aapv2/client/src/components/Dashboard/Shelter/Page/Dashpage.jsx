import "./Dashpage.css"
import {useEffect,useState} from  "react";
import axios from 'axios';
import {Link} from "@reach/router"
import ShelterPost from "../../Popups/CreatePost/ShelterPost"
import ShelterEdit from "../Edit/ShelterEdit"
import CreateProfile from "../../Popups/CreateProfile/CreateProfile"
import LCL from "./S_L_C_List"
import Comment from "./Comment"



const Dashpage = props => {
    const {posts} = props
    const [profiles, setProfiles]=useState([])
    const [session, setSession]=useState([])
    const[postPopUp,setPostPopUp] = useState(false)
    const [editShelter, setEditShelter] = useState(false)
    const [createPro , setCreatePro] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0])
                setProfiles(res.data.profiles)
            }
        });
    }, [props]);

    const editShelterButton = e =>{
        setEditShelter(prev => !prev)
    }

    const createProButton = e =>{
        setCreatePro(prev => !prev)
    }

    const createPost = e =>{
        setPostPopUp(prev => !prev)
        console.log(postPopUp)
    }
    console.log(posts)

    return(
        session ?  
        <div>
            <ShelterPost
            session={session}
            createPost={createPost}
            PostPopUp={postPopUp}
            />
            <ShelterEdit
            session={[session]}
            editShelterButton={editShelterButton}
            editShelter={editShelter}
            />
            <CreateProfile
            session={[session]}
            createPro={createPro}
            createProButton={createProButton}
            />
            <div className="shelterHeader">
                <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" className="shelterProfilePic"/>
                <h1 className="shelterName">{session.name}</h1>
                <div className="borderBottom"></div>
            </div>
            <div className="shelterBody">
                <div className="leftPannel">
                    <div className="infoCard">
                        <div className="about">
                            <h5>Bio</h5>
                        </div>
                        <div className="info">
                            <h5>{session.email}</h5>
                            <button 
                            session={session}
                            className="btn btn-info" 
                            onClick={editShelterButton}
                            >
                                Edit
                            </button>
                            <button 
                            session={session}
                            className="btn btn-info" 
                            onClick={createProButton}
                            >
                                Create
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
                    <div className="createPost">
                        <div className="postPic">
                            <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" />
                        </div>
                        <div className="postInput">
                            <button
                            session={session}
                            // profile={profile}
                            onClick={createPost}
                            >
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
                                    <>
                                    {
                                    post.PID === null ?
                                    <div className="posts" key={y}>
                                        <div className="postpic">
                                            <Link to={`/dashboard`}
                                            className="postpic"
                                            >
                                            <img src={post.p_img_url ? post.p_img_url : session.img_url} alt="" />
                                            <p>{post.p_name ? post.p_name : session.name}</p>
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
                                    <div className="posts" >
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
        : !session
    )
}

export default Dashpage
