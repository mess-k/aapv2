import React from "react"
import "./Proform.css"
import ReactCrop from 'react-image-crop';
import {useState,useEffect} from 'react'
import axios from "axios";



const ProfileForm = props =>{

    const [session, setSession] = useState([])


    const {handleChange,inputs,handleSubmit,onSelectFile,upImg,onLoad,setCrop,crop,onCropComplete,previewCanvasRef} = props;


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

    return(
        session ?
        <div>
            {
                session.map((s,k) =>{
                    return(
                        <div className="proform" key = {k}>
                            <h1 className="d-flex justify-content-center">Create a profile for a pet</h1>
                                <form onSubmit={handleSubmit} className="box">
                                    <div  className="mid">                     
                                <div className="in">
                                    <label htmlFor="type">Type:</label>
                                    <select name="type" value={inputs.type} onChange={handleChange} className="inputs">
                                        <option>Cat</option>
                                        <option>Dog</option>
                                        <option>Other</option>
                                    </select>
                                    <label htmlFor="name">Name:</label>
                                    <input 
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={inputs.name}
                                        className="inputs"
                                    />
                                    <label htmlFor="age">Age:</label>
                                    <input 
                                        type="text"
                                        name="age"
                                        onChange={handleChange}
                                        value={inputs.age}
                                        className="inputs"
                                    />
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        value={inputs.description}
                                        rows="5"
                                        className="inputs"
                                    />
                                    <label htmlFor="pic">Picture:</label>
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
                                </div>
                                <div className="pic">
                                <label htmlFor="name">Preview:</label>
                                    <canvas
                                        className="preview"
                                        ref={previewCanvasRef}
                                    />
                                </div>
                                </div>
                                    {/* <input type="hidden" name="shelter"  value={s.id}/> */}
                                    <input type="submit" value="Create!" className="btn btn-info"/>
                            </form>
                        </div> 
                    )
                }
            )
        }
        </div>: <h1> youve been logged out</h1>
    )
}

export default ProfileForm;