import React from "react"
import styled from "styled-components"
import { useState, useRef } from  "react";
import axios from "axios";
import ReactCrop from 'react-image-crop';


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
    const {session,editShelterButton} = props
    const [updateShelter, setUpdateShelter] = useState({
        name:`${session.name}`,
        email:`${props.session.email}`,
        id:`${props.session.id}`,
        img_url:`${session.img_url}`
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
        setUpdateShelter({
            ...updateShelter,
            [e.target.name]: e.target.value,
            
        })
        console.log(updateShelter)
    };

    

    const submitEdit = e =>{
        e.preventDefault()
        e.preventDefault();
        const formData = new FormData();
        if(croppedImage.current && croppedImage.current.name){
            formData.append("profilepic", croppedImage.current, croppedImage.current.name);
            formData.append("name", updateShelter.name)
            formData.append("age", updateShelter.email)
            formData.append("type", updateShelter.password)
            axios.put("http://localhost:8000/api/shelter/edit/uploadpic",formData,{
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
            console.log(updateShelter)
            axios.put("http://localhost:8000/api/shelter/edit",updateShelter)
                .then(res => {
                    window.location.replace(`/dashboard`)
                })
            
        }
    }


    return(
        <PopUpWrapper >
            <div className="PostHeader">
            <h1>Update {session.name}</h1>
            <button className="btn btn-light" value="x" onClick={editShelterButton}>x</button>
            </div>
                <form onSubmit={submitEdit}>  
                <PopUpContent>
                    <div className="upbox" >
                        <div className="upinfo">
                            <div className="uptext">
                                <label htmlFor="name">Shelter Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={session.name}
                                    onChange={handleChange}
                                    value={updateShelter.name}
                                    className="inputs"
                                />
                                <label htmlFor="age">Email:</label>
                                <input 
                                    type="text"
                                    name="email"
                                    placeholder={session.email}
                                    onChange={handleChange}
                                    value={updateShelter.email}
                                    className="inputs"
                                />
                                <label htmlFor="name">Preview:</label>
                                <canvas
                                    ref={previewCanvasRef}
                                />
                            </div>
                            <div className="uppic">
                                <input 
                                    type="file" 
                                    name="image" 
                                    placeholder={session.img_url}
                                    accept="image/*" 
                                    multiple={false} 
                                    onChange={onSelectFile} 
                                    
                                    />
                                <ReactCrop
                                    // name="image"
                                    src={upImg}
                                    onImageLoaded={onLoad}
                                    crop={crop}
                                    onChange={(c) => setCrop(c)}
                                    onComplete={onCropComplete}
                                    />
                                <input
                                    type="hidden" 
                                    name="id"  
                                    value={session.id}
                                    ref={x => {x = `${session.id}`}}
                                    />
                            </div>
                        </div>
                        <div>
                            <input type="submit" value="Create!" className="btn btn-info"/>
                        </div>
                    </div>
                </PopUpContent>
            </form>
        </PopUpWrapper>
    )
}

export default EditPopUpForm