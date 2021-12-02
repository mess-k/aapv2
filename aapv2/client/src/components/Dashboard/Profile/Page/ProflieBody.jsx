import React from 'react';
import "./Profile.css"
import {useState} from  "react";
// import axios from "axios";
import Editpop from "../../Popups/EditProfile"

const Proflie = props => {
    const[editPopUp,setEditPopUp] = useState(false)
    const{profile,session} = props

    // useEffect(() => {
    //     const profileID = props.id
    //     axios.get(`http://localhost:8000/api/profile/find`, {params:{id: profileID}})
    // }, [props]);

    const EditProfileButton = (e)=>{
        setEditPopUp(prev => !prev)
        console.log(editPopUp)
        console.log(props)
    }

    return (
        profile ? 
        <div>
            {
                profile.map((p,k)=>{
                    return(
                        <div className="profile" key={k}>
                            <div className="profileHeader">
                            <Editpop
                            profile={profile}
                            editPopUp={editPopUp}
                            session={session}
                            />
                                <img src={process.env.PUBLIC_URL+`${p.img_url}`} alt="" className="petProfilePic"/>
                                <h1 className="petName">{p.name}</h1>
                                <div className="borderBottom"></div>
                            </div>
                            <div className="profileBody">
                                    <div className="leftPannel">
                                        <div className="infoCard">
                                            <div className="about">
                                                <h4>About</h4>
                                            </div>
                                            <div className="info">
                                                <h4>Age: {p.age}</h4>
                                                <h4>Type: {p.type}</h4>
                                                <h4>{p.description}</h4>
                                                <button 
                                                profile = {profile}
                                                className="btn btn-info" 
                                                onClick={EditProfileButton}
                                                >
                                                    Edit
                                                </button>
                                                <>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rightPannel">
                                        <div className="createPost">
                                            <h4>post</h4>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    )
                })
            }
        </div> : <h1>"Cant find info on this pet sorry ):"</h1>
    );
}

export default Proflie;