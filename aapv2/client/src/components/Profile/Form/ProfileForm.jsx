import React from "react"
import "./Proform.css"
import ReactCrop from 'react-image-crop';



const ProfileForm = props =>{
    const {session,handleChange,inputs,handleSubmit,onSelectFile,upImg,onLoad,setCrop,crop,onCropComplete,previewCanvasRef} = props;


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
                                        name="desc"
                                        onChange={handleChange}
                                        value={inputs.desc}
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
        </div>: <h1> youve been logged out</h1>
    )
}

export default ProfileForm;