import React from "react"
import styled from "styled-components"
import { useState, useRef } from  "react";
import {useEffect} from  "react";
import axios from 'axios';
import ReactCrop from 'react-image-crop';
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
    display:flex;
    text-align:center;
    flex-direction:column;
    width: 1000px;
    height: 800px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    margin-top: -150px;
    overflow:hidden;
    .PostHeader {
        display:flex;
        justify-content: space-between;
    }
`;
const PopUpContent = styled.div`
    width:90%;
    margin:auto;
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
    postion:  relative:
    line-height: 1.8;
    color: #141414;
    p {
        margin-bottom: 1rem;
    }
    .upbox{
        width:100%;
        height:700px;
    }
    .upinfo{
        height:700px;
        display:flex;
        align-items:center;
        justify-content:space-evenly;
    }
    .uptext{
        width:50%;
        display:flex;
        flex-direction:column;
        
        margin:auto;
        canvas{
            margin:auto;
            width:200px;
            height:200px;
            border-radius:50%/50%;
        }
    }
    .uppic{
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        width:50%;
        .ReactCrop{
            max-width:100%;
            max-height:100%;
            margin:auto;
            
        }
    }
`;

const EditPopUpForm = props => {
    const {session,createPro,createProButton} = props
    // const [session, setSession]=useState([])
    const [createProfile, setcreateProfile] = useState({
        name:"",
        age:``,
        type:"",
        desc:"",
        img_url:``,
        up_id:`${session[0].id}`
    })
    console.log(session[0].id)

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/shelter/login`)
    //     .then((res) => {
    //         if (res.data.loggedIn === true) {
    //             setSession(res.data.shelter[0])
    //         }
    //     });
    // }, [props]);

    const [upImg, setUpImg] = useState();
    const[filenName, setFileName] = useState()
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
    const croppedImage = useRef(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
            setFileName(e.target.files[0].name)
        }
    };

    const onLoad = (img) => {
        imgRef.current = img;
    };

    const onCropComplete = (crop) => {
        makeClientCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if (imgRef.current && crop.width && crop.height) {
            croppedImage.current = await getCroppedImg(
            imgRef.current,
            crop,
            `${filenName}`
            );
        }
    };

    const getCroppedImg = (image, crop, fileName) => {
        if (!previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const canvas = previewCanvasRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = 1.0;
        
    
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                reject(new Error('Canvas is empty'));
                console.error("Canvas is empty");
                return;
                }
                blob.name = fileName;
                resolve(blob);
            }, "image/jpeg");
        });
    };

    const handleChange = e =>{
        e.preventDefault()
        setcreateProfile({
            ...createProfile,
            [e.target.name]: e.target.value,
            up_id:`${session[0].id}`,
        })
        console.log(createProfile)
    };

    

    const handleSubmit = e =>{
        e.preventDefault()
        e.preventDefault();
        const formData = new FormData();
        if(croppedImage.current && croppedImage.current.name){
            formData.append("profilepic", croppedImage.current, croppedImage.current.name);
            formData.append("name", createProfile.name)
            formData.append("age", createProfile.age)
            formData.append("up_id", createProfile.up_id)
            formData.append("type", createProfile.type)
            formData.append("desc", createProfile.desc)
            axios.post("http://localhost:8000/api/profile/createprofile",formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then((res) => {
                    window.location.replace(`/dashboard`)
                    console.log(session)
                })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            console.log(createProfile)
            axios.put("http://localhost:8000/api/shelter/edit",createProfile)
                .then(res => {
                    window.location.replace(`/dashboard`)
                })
            
        }
    }
    const animation = useSpring ({
        config: {
            duration:250
        },
        opacity: createPro ? 1:0,
        transform: createPro ? `translateY(0%)` : `translateY(-100%)`
    })


    return(
        createPro ? 
        <Background> 
            <animated.div style={animation}>
                <PopUpWrapper >
                    {
                        session.map((s,k) =>{
                            return(
                                <div key={k}>

                    <div className="PostHeader">
                    <h1>Update {session.name}</h1>
                    <button className="btn btn-light" value="x" onClick={createProButton}>x</button>
                    </div>
                        <form onSubmit={handleSubmit} >
                            <PopUpContent>
                            <div  className="upbox">                     
                                <div className="upinfo">
                                    <div className="uptext">
                                        <label htmlFor="type">Type:</label>
                                        <select name="type" value={createProfile.type} onChange={handleChange} className="inputs">
                                            <option value="" onChange={handleChange}></option>
                                            <option value="Cat" onChange={handleChange}>Cat</option>
                                            <option value="Dog" onChange={handleChange}>Dog</option>
                                            <option value="Other" onChange={handleChange}>Other</option>
                                        </select>
                                        <label htmlFor="name">Name:</label>
                                        <input 
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            value={createProfile.name}
                                            className="inputs"
                                        />
                                        <label htmlFor="age">Age:</label>
                                        <input 
                                            type="text"
                                            name="age"
                                            onChange={handleChange}
                                            value={createProfile.age}
                                            className="inputs"
                                        />
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            type="text"
                                            name="desc"
                                            onChange={handleChange}
                                            value={createProfile.desc}
                                            rows="5"
                                            className="inputs"
                                        />
                                        <canvas
                                            ref={previewCanvasRef}
                                        />
                                    </div>
                                    <div className="uppic">
                                        <input 
                                            type="file" 
                                            name="image" 
                                            accept="image/*" 
                                            multiple={false} 
                                            onChange={onSelectFile} 
                                        />
                                        <ReactCrop
                                            name="image"
                                            src={upImg}
                                            onImageLoaded={onLoad}
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={onCropComplete}
                                        />
                                        <input
                                        type="hidden" 
                                        name="up_id"  
                                        value={s.id}
                                        ref={x => {x = `${s.id}`}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="submit" value="Create!" className="btn btn-info"/>
                            </div>
                        </PopUpContent>
                    </form>
                    </div>
                    )
                    })
                    }
                </PopUpWrapper>
        </animated.div> 
    </Background> : !createPro
    )
}

export default EditPopUpForm