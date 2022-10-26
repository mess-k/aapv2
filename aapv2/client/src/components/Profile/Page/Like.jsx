import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./Profile.css";

const Like = props => {
    const {postID,sessionID} = props
    const [session, setSession] = useState(false)
    const [find, setFind] = useState(false)
    const [like] = useState({
        postID:`${postID}`,
        userID:""
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);


    useEffect(() =>{
        const post_ID = postID
        axios.get("http://localhost:8000/api/user/find/like",{params:{id: post_ID}})
            .then(res => {
                setFind(res.data)
            })
    })

    const LikePost = (e) =>{ 
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/user/like",like)
            .then (res => {
                // setLike()
                setFind(prev => !prev)
            })
            .catch (err => {
                console.log(err)
            }) 
        }
    

    const Dislike = (e) =>{ 
        e.preventDefault()
        const post_ID = postID
        axios.delete(`http://localhost:8000/api/user/like/`,{params:{id: post_ID}})
            .then (res => {
                // setLike(prev => !prev)
                setFind(prev => !prev)
            })
            .catch (err => {
                console.log(err)
            }) 
    }


    return (
        <div className='L_C_FORMS'>
                {
                    find ? 
                    <form onSubmit={Dislike}>
                        <input 
                            type="submit" 
                            className='N_L_C' 
                            value="Liked" 
                        />
                        <input 
                            type="hidden" 
                            name="postID" 
                            value={postID}
                        />
                        <input 
                            type="hidden" 
                            name="userID" 
                            value={sessionID}
                        />
                    </form>
                    :
                    <form onSubmit={LikePost}>
                        <input 
                            type="submit" 
                            className='L_C' 
                            value="Like" 
                        />
                        <input 
                            type="hidden" 
                            name="postID" 
                            value={postID}
                            />
                        <input 
                            type="hidden" 
                            name="userID" 
                            value={sessionID}
                        />
                    </form>
                }
        </div>
    );
};


export default Like; 