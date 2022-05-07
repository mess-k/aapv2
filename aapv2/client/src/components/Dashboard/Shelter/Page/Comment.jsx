import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import moment from "moment"

const Comment = props =>{
    const {postID} = props
    const [session, setSession] = useState()
    const [comment, setComment] = useState({
        postID:"",
        comment:"",
        date:""
    })

    const handleChange = e =>{
        e.preventDefault()
        setComment({
            ...setComment,
            [e.target.name]: e.target.value,
            postID:`${postID}`,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    };
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0]);
            }
        });
    }, [props]);

    const PostComment = e =>{
        axios.post('http://localhost:8000/api/shelter/postcomment', comment)
            .then(res => {

            })
    }
    
    return(
        session ?
        <div>
            <div className="createComments">
                <div className="postPic">
                    <img src={process.env.PUBLIC_URL+`${session.img_url}`} alt="" />
                </div>
                    <form onSubmit={PostComment}>
                        <div className="postInput">
                            <TextareaAutosize
                            className='commentInput'
                            cols="100"
                            placeholder='Post a comment'
                            name="comment"
                            onChange={handleChange}
                            />
                            <div>
                            <input 
                            type="submit" 
                            value="Post" />
                            </div>
                            <input 
                            type="hidden" 
                            name="postID"
                            value={postID}
                            />
                        </div>
                    </form>
            </div>
        </div>: <p>chill</p>
        
    )
}

export default Comment;