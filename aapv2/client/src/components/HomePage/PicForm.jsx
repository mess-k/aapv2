import axios from 'axios';
import React from 'react';
import { useState, useCallback, useRef, useEffect } from  "react";
import ReactCrop from 'react-image-crop';
import "./PicForm.css"
import { navigate } from '@reach/router';

const PicForm = props => {
    
    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }
        
        canvas.toBlob(
            (blob) => {
                const previewUrl = window.URL.createObjectURL(blob);
                
                const anchor = document.createElement('a');
                anchor.download = 'cropPreview.png';
                anchor.href = URL.createObjectURL(blob);
                anchor.click();
                
                window.URL.revokeObjectURL(previewUrl);
            },
            'image/png',
            1
        );
    }
        const {session} = props;
        const [upImg, setUpImg] = useState();
        const imgRef = useRef(null);
        const previewCanvasRef = useRef(null);
        const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1/1 });
        const [completedCrop, setCompletedCrop] = useState(null);
        const [picName, setPicName] = useState(null);
        
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);
    
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
        return;
    }
    
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
    
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
        );
    }, [completedCrop]);

    useEffect(() => {
        console.log(session)
    }, [session])



    // const uploadCrop = e =>{
    //     e.preventDefault();

    //     axios.put("http://localhost:8000/api/user/edit/uploadPic",crop)
    //     .then(res =>{ 
    //         navigate("/home")
            
    //     })
    //     .catch(err => {
    //         console.log("err")
    //     })
    // }


    const uploadCrop = event => {
        // event.preventDefault()
        // setCompletedCrop(event.target.files[0]);
        // setPicName(event.target.file[0].name);
        const formData = new FormData();
        formData.append("profilepic", completedCrop);
        formData.append("picName", picName);
        console.log(completedCrop)
        axios.put(
            "http://localhost:8000/api/user/edit/uploadPic",formData)
            .then(res => {
                navigate("/upload")
            })
            .catch (err =>{
                console.log(err)
            })
    };


    return (
        session ?
            <div className="uploader">
                <form onSubmit={uploadCrop}>
                    <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    multiple={false} 
                    onChange={onSelectFile} 
                    />
                    <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(e) => setCompletedCrop(e)}
                    />
                    <canvas
                    name="image"
                    ref={previewCanvasRef}
                    style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0)
                    }}
                    />
                    <input type="submit" value="Upload" className="btn btn-info"/>
                </form>
            </div>
        : <h1>Youve been logged out</h1>
    );
}

export default PicForm;
