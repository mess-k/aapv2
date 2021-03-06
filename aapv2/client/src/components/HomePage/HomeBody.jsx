import "./HomeBody.css"
import {useEffect,useState} from  "react";
import axios from 'axios';
import {Link} from "@reach/router"
import ShelterPost from "./Popups/ShelterPost"
import ShelterEdit from "./Popups/ShelterEdit"



const HomeBody = props => {
    const {posts} = props
    const [profiles, setProfiles]=useState([])
    const [session, setSession]=useState([])
    const[postPopUp,setPostPopUp] = useState(false)
    const [editShelter, setEditShelter] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0])
                // setProfiles(res.data.profiles)
            }
        });
    }, [props]);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/find/profiles/follow`)
        .then((res) => {
                setProfiles(res.data)
            
        });
    }, [props]);

    console.log(profiles)

    const editShelterButton = e =>{
        setEditShelter(prev => !prev)
    }

    const createPost = e =>{
        setPostPopUp(prev => !prev)
        console.log(postPopUp)
    }

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
            editShelter={editShelter}
            editShelterButton={editShelterButton}
            />
            <div className="shelterHeader">
                <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" className="shelterProfilePic"/>
                <h1 className="shelterName">{session.first_name} {session.last_name}</h1>
                <div className="borderBottom"></div>
            </div>
            <div className="shelterBody">
                <div className="leftPannel">
                    <div className="infoCard">
                        <div className="about">
                            <h4>About</h4>
                        </div>
                        <div className="info">
                            <h4>{session.email}</h4>
                            <button 
                            session={session}
                            // profile = {profile}
                            className="btn btn-info" 
                            onClick={editShelterButton}
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
                                        <Link to={`/profile/view/${p.proID}`}
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
                                    <div className="posts" key={y}>
                                        <div className="postpic">
                                            <img src={post.img_url ? post.img_url : session.img_url} alt="" />
                                            <h3>{post.name ? post.name : session.name}</h3>
                                        </div>
                                        <div className="postcontext">
                                            <p>
                                                {post.context}
                                            </p>
                                        </div>
                                        <div className="postimg">
                                            <img src={process.env.PUBLIC_URL+`${post.post_url}`} alt="" />
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
        : !session
    )
}

export default HomeBody
