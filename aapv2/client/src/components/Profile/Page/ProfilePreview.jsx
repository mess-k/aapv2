import React from 'react';
import "./Profile.css"
import {useState,useEffect} from "react";
import axios from "axios"

// import axios from 'axios';

const Proflie = props => {
    const{profile,posts} = props
    const [session, setSession] = useState()
    const [map, setMap] = useState([])
    const [find, setFind] = useState(false)
    const [like, setLike] = useState({
        postID:"",
        userID:""
    })
    console.log(session)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);

    useEffect(() =>{
        let userLikes = posts.map((x,y)=> x.id)
        console.log(userLikes)
        axios.post("http://localhost:8000/api/user/find/like",userLikes)
            .then(res => {
                console.log("something")
            })
    })

    const LikePost = (e) =>{ 
        e.preventDefault()
        axios.post("http://localhost:8000/api/user/like",like)
            .then (res => {
                setLike(res.data)
            })
            .catch (err => {
                console.log(err)
            }) 

            
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
                                                                <>
                                                                {
                                                                    find ? 
                                                                    <form action="">
                                                                        <input 
                                                                            type="submit" 
                                                                            className='L_C' 
                                                                            value="dislike" 
                                                                        />
                                                                        <input 
                                                                            type="hidden" 
                                                                            name="postID" 
                                                                            value={post.id} 
                                                                            ref={x => {like.postID = `${post.id}`}}
                                                                        />
                                                                    <input 
                                                                        type="hidden" 
                                                                        name="userID" 
                                                                        value={session.id}
                                                                        ref={x => {like.userID = `${session.id}`}}
                                                                    />
                                                                    </form>
                                                                    :
                                                                    <form onSubmit={LikePost}>
                                                                        <input type="submit" className='L_C' value="Like" />
                                                                        <input 
                                                                    type="hidden" 
                                                                    name="postID" 
                                                                    value={post.id} 
                                                                    ref={x => {like.postID = `${post.id}`}}
                                                                />
                                                                <input 
                                                                    type="hidden" 
                                                                    name="userID" 
                                                                    value={session.id}
                                                                    // ref={x => {like.userID = `${session.id}`}}
                                                                />
                                                                    </form>
                                                                }
                                                                <input 
                                                                    type="hidden" 
                                                                    name="postID" 
                                                                    value={post.id} 
                                                                    ref={x => {like.postID = `${post.id}`}}
                                                                />
                                                                <input 
                                                                    type="hidden" 
                                                                    name="userID" 
                                                                    value={session.id}
                                                                    ref={x => {like.userID = `${session.id}`}}
                                                                />
                                                                </>
                                                                <button className='L_C'>
                                                                    Comment
                                                                </button>
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