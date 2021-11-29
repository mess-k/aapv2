import React from 'react';
import axios from "axios";
import SNav from "../../components/Nav/SNav"
import { useState, useRef, useEffect } from  "react";
import ProForm from "../../components/Dashboard/Profile/ProfileForm"
import { navigate } from '@reach/router';


const CreateProfile = props => {
    const [session, setSession] = useState([])

    const [profile, setProfile] = useState({
        shelter:"",
        name:"",
        age:"",
        type:"",
        desc:"",
        img_url:""
    })
    
    const handleChange = e =>{
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
        console.log(profile)
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                // console.log(res.data.loggedIn)
                // console.log(res.data.Shelter)
                setSession([res.data.shelter[0]]);
                // console.log(session)
            }
            else{
                console.log("fail")
            }
        });
    }, [props]);

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
    

    const handleSubmit = e =>{
        e.preventDefault();
        const formData = new FormData();
        console.log(profile.shelter)
        formData.append("profilepic", croppedImage.current, croppedImage.current.name);
        formData.append("shelter", profile.shelter)

        formData.append("name", profile.name)
        formData.append("age", profile.age)
        formData.append("type", profile.type)
        formData.append("description", profile.description)

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
    };

    
    return (
        <>
        <SNav/>
        <ProForm
        session={session}
        handleChange={handleChange}
        inputs={profile}
        handleSubmit={handleSubmit}
        onSelectFile={onSelectFile}
        upImg={upImg}
        onLoad={onLoad}
        crop={crop}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        previewCanvasRef={previewCanvasRef}
        />
        </>
    );
    
}

export default CreateProfile;