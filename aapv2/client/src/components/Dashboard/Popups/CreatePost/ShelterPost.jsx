import  React from "react";
import styled from "styled-components"
import { useState } from  "react";
import axios from "axios";
import moment from "moment"
import {useSpring,animated } from "react-spring"

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PopUpWrapper = styled.div`
    width:600px;
    height: 800px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 1000;
    border-radius: 10px;
    margin-top: -100px;
    overflow:auto;
`;
const PopUpContent = styled.div`
    margin: 10px;
    overflow:auto;
    .PostHeader{
        border-radius:50%/50%;
        height:50px;
        justify-content:flex-start;
    }
    form{
        display:flex;
        flex-direction:column;
    }
    form textarea{
        border: none;
        outline: none;
        overflow-wrap: break-all; 
        
    }
    .PostHeader{
        display:flex;
        justify-content:space-between;
    }
`;
const CreatePost = (props) =>{
    const{session,PostPopUp,PopUpRef,createPost} = props
    const [upImg, setUpImg] = useState();
    const[fileName, setFileName] = useState("")
    const [preview, setPreview] = useState(null);

    const [post, setPost] = useState({
        context: "",
        img_url: "",
        shelter:  `${props.session.id}`,
        date:""
    })
    const handleChange = e =>{
        e.preventDefault()
        setPost({
            ...setPost,
            [e.target.name]: e.target.value,
            shelter:  `${session.id}`,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    };
    
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setUpImg(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
            setFileName(e.target.files[0].name)
        }
    };

    const animation = useSpring ({
        config: {
            duration:250
        },
        opacity: PostPopUp ? 1:0,
        transform: PostPopUp ? `translateY(0%)` : `translateY(-100%)`
    })

    const Post = e =>{
        e.preventDefault()
        const date = moment().format('YYYY-MM-DD HH:mm:ss')
        if(upImg && fileName){
            const formData = new FormData();
            formData.append("postFile", upImg, fileName);
            formData.append("context", post.context);
            formData.append("shelter", props.session.id );
            formData.append("date", date);
            console.log(props.session.id)
            axios.post("http://localhost:8000/api/profile/post/w/pic",formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then((res) => {
                    window.location.replace(`/pet/profile/${props.profile[0].id}`)
                })
            .catch(err => {
                console.log(err)
            })
        }
        if(!upImg){
            e.preventDefault()
            console.log(post)
            axios.post("http://localhost:8000/api/profile/post",(post))
            .then(res => window.location.replace(`/pet/profile/${props.profile[0].id}`))
            
        }
    }

    return(
        <>
        {
            PostPopUp ? (
            <Background onclick={createPost} ref={PopUpRef}>
                <animated.div style={animation}>
                <PopUpWrapper>
                    <PopUpContent>
                    <div className="postBody">
                        <div className="PostHeader">
                            <img src={process.env.PUBLIC_URL+`${session.img_url}`} className="PostHeader" alt="" />
                            <button className="btn btn-light" value="x" onClick={createPost}>x</button>
                        </div>
                        <form onSubmit={Post}>
                            <textarea 
                                rows="6" 
                                name="context"
                                placeholder="What would you like to share?"
                                onChange={handleChange}
                            >
                            </textarea>
                            <input 
                                type="file" 
                                name="" 
                                onChange={onSelectFile}  
                                accept="image/*" 
                            />
                            <img src={preview} alt="" />
                            <input type="submit" value="Post" className="btn btn-info" />
                        </form>
                    </div>
                    </PopUpContent>
                </PopUpWrapper>
                </animated.div>
            </Background>
        ) : !PostPopUp
        }
        </>
    )
}

export default CreatePost