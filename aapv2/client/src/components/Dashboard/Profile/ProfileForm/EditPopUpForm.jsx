import React from "react"
import styled from "styled-components"
import { useState, useRef, useEffect } from  "react";
import axios from "axios";
import { navigate } from "@reach/router";
import ReactCrop from 'react-image-crop';

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
`;
const PopUpContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    postion:  relative:
    line-height: 1.8;
    color: #141414;
    p {
        margin-bottom: 1rem;
    }
    upproform{
        postion: relative:
        display:flex;
    }
    .uppic {
        max-width:400px;
        height: 100px;
    }
    .upbox{
        height: 100%;
        width: 100%;
    }
    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;
const EditPopUpForm = props => {
    const {profile,session} = props
    const [updatePro, setUpdatePro] = useState({
        shelter:"",
        name:"",
        age:"",
        type:"",
        desc:"",
        img_url:""
    })
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
        setUpdatePro({
            ...updatePro,
            [e.target.name]: e.target.value,
            
        })
        console.log(updatePro)
    };

    

    const submitEdit = e =>{
        e.preventDefault()
        const proID = props.profile[0].id 
        e.preventDefault();
        const formData = new FormData();
        formData.append("profilepic", croppedImage.current, croppedImage.current.name);
        formData.append("shelter", updatePro.shelter)
        formData.append("name", updatePro.name)
        formData.append("age", updatePro.age)
        formData.append("type", updatePro.type)
        formData.append("desc", updatePro.desc)

        axios.post("http://localhost:8000/api/profile/createprofile",formData,{
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
    


    return(
        <>
            <Background>
                <PopUpWrapper>
                    <PopUpContent>
                        <div>
                        {
                            profile ?
                            <div>
                                {
                                profile.map((s,k) =>{
                                    return(
                                        <div className="upproform" key = {k}>
                                            <h1 className="d-flex justify-content-center">Create a profile for a pet</h1>
                                                <form onSubmit={submitEdit} className="upbox">                   
                                                    <label htmlFor="type">Type:</label>
                                                    <select name="type" value={updatePro.type} onChange={handleChange} className="">
                                                        <option value="" onChange={handleChange}></option>
                                                        <option value="Cat" onChange={handleChange}>Cat</option>
                                                        <option value="Dog" onChange={handleChange}>Dog</option>
                                                        <option value="Other" onChange={handleChange}>Other</option>
                                                    </select>
                                                    <label htmlFor="name">Name:</label>
                                                    <input 
                                                        type="text"
                                                        name="name"
                                                        placeholder={s.name}
                                                        onChange={handleChange}
                                                        value={updatePro.name}
                                                        className="inputs"
                                                    />
                                                    <label htmlFor="age">Age:</label>
                                                    <input 
                                                        type="text"
                                                        name="age"
                                                        onChange={handleChange}
                                                        value={updatePro.age}
                                                        className="inputs"
                                                    />
                                                    <label htmlFor="description">Description:</label>
                                                    <textarea
                                                        type="text"
                                                        name="desc"
                                                        onChange={handleChange}
                                                        value={updatePro.desc}
                                                        rows="5"
                                                        className="inputs"
                                                    />
                                                <div className="uppic">
                                                    <label htmlFor="pic">Picture:</label>
                                                    <input 
                                                        type="file" 
                                                        name="image" 
                                                        accept="image/*" 
                                                        multiple={false} 
                                                        onChange={onSelectFile} 
                                                        
                                                    />
                                                    <div>
                                                    <ReactCrop
                                                        name="image"
                                                        src={upImg}
                                                        onImageLoaded={onLoad}
                                                        crop={crop}
                                                        onChange={(c) => setCrop(c)}
                                                        onComplete={onCropComplete}
                                                    />
                                                <label htmlFor="name">Preview:</label>
                                                    <canvas
                                                        className="preview"
                                                        ref={previewCanvasRef}
                                                    />
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                                    <input
                                                        type="hidden" 
                                                        name="shelter"  
                                                        value={s.id}
                                                        ref={x => {x = `${s.id}`}}
                                                        />
                                                    <input type="submit" value="Create!" className="btn btn-info"/>
                                                    </form>
                                                </div> 
                                            )
                                        }
                                    )
                                }
                            </div>: null
                        }
                    </div>
                </PopUpContent>
            </PopUpWrapper>
        </Background>
    </>
    )
}

export default EditPopUpForm