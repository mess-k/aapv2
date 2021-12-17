import  React from "react";
import styled from "styled-components"
import { useState, useRef } from  "react";
import axios from "axios";
import { navigate } from "@reach/router";



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
    z-index: 10;
    border-radius: 10px;
    margin-top: -150px;
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
`;


const CreatePost = (props) =>{
    const{profile,session,PostPopUp} = props
    const [upImg, setUpImg] = useState();
    const[fileName, setFileName] = useState()
    const imgRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const [post, setPost] = useState({
        description: "",
        img_url: "",
        profile_id: `${profile[0].id}`,
        shelter_id:  `${session.id}`
    })

    const handleChange = e =>{
        e.preventDefault()
        setPost({
            ...setPost,
            [e.target.name]: e.target.value,
            
        })
    };
    

    
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
            setFileName(e.target.files[0].name)
        }
    };

    const Post = e =>{
        e.preventDefault()
        if(upImg && fileName){
            const formData = new FormData();
            formData.append("file", upImg);
            formData.append("fileName", fileName);
            console.log("working")
            axios.post("http://localhost:8000/api/profile/update/w/pic",formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then((res) => {
                        navigate("/dashboard")
                        console.log(profile)
                })
            .catch(err => {
                console.log(err)
            })
        }
    }


    return(
        <>
        {
            PostPopUp ? 
            <Background>
                <PopUpWrapper>
                    <PopUpContent>
                    <div className="postBody">
                        <div className="PostHeader">
                            <img src={process.env.PUBLIC_URL+`${profile[0].img_url}`} className="PostHeader" alt="" />
                        </div>
                        <form onSubmit={Post}>
                            <textarea 
                                rows="6" 
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
                            <input type="hidden" name="profile_id"  value={profile[0].id} />
                            <input type="hidden" name="shelter_id" value={session.id} />
                        </form>
                    </div>
                    </PopUpContent>
                </PopUpWrapper>
            </Background>
        : !PostPopUp
        }
        </>
    )
}

export default CreatePost