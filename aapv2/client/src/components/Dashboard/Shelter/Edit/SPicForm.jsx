import { navigate } from '@reach/router';
import axios from 'axios';
import React from 'react';
import { useState, useRef } from  "react";
import ReactCrop from 'react-image-crop';
// import { navigate } from '@reach/router';

const pixelRatio = 1.0;

const SPicForm = props => {
    const [session, setSession] = useState([])
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

    
    const uploadCrop= (e) =>  {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profilepic", croppedImage.current, croppedImage.current.name);

        axios.put("http://localhost:8000/api/shelter/edit/uploadPic",formData)
            .then(res=> {
                setSession(res.data.final)
                navigate('/dashboard')
            })
            .catch(err =>{
            console.log(err)
            })
    };

    return (
        session ?
            <div className="uploader">
                <form onSubmit={uploadCrop} className="form">
                    <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    multiple={false} 
                    onChange={onSelectFile} 
                    />
                    <div className="crop">
                    <ReactCrop
                    name="image"
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={onCropComplete}
                    />
                    </div>
                    <canvas
                    ref={previewCanvasRef}
                    />
                    <input type="submit" value="Upload" className="btn btn-info"/>
                </form>
            </div>
        : <h1>Youve been logged out</h1>
    );

}

export default SPicForm;
