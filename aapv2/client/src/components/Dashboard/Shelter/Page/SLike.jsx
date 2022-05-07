import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import "./Profile.css";

const SLike = props => {
    const {postID,sessionID} = props
    const [session, setSession] = useState(false)
    const [find, setFind] = useState(false)
    const [sfind, setSFind] = useState(false)
    const [like, setLike] = useState({
        postID:`${postID}`,
        userID:""
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0]);
            }
        });
    }, [props]);


    useEffect(() =>{
        const post_ID = postID
        axios.get("http://localhost:8000/api/shelter/find/like",{params:{id: post_ID}})
            .then(res => {
                setFind(res.data)
            })
    })

    
        const SLikePost = (e) =>{ 
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/shelter/like",like)
            .then (res => {
                // setLike()
                setSFind(prev => !prev)
            })
            .catch (err => {
                console.log(err)
            }) 
        }

    const SDislike = (e) =>{ 
        e.preventDefault()
        const post_ID = postID
        axios.delete(`http://localhost:8000/api/shelter/like/`,{params:{id: post_ID}})
            .then (res => {
                // setLike(prev => !prev)
                setSFind(prev => !prev)
            })
            .catch (err => {
                console.log(err)
            }) 
    }

    return (
        <div className='L_C_FORMS'>
                {
                    find ? 
                    <form onSubmit={SDislike}>
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
                    <form onSubmit={SLikePost}>
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


export default SLike;