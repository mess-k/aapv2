import React from 'react';
import FP from "../FollowList/FollowPreview"
import {useState,useEffect} from "react"
import axios from "axios"

const Followlistleft = props => {
    const {setProView,setProID,fList,profile,right,proID} = props
    const [session, setSession]=useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0])
            }
        });
    }, [props]);


    return (
        <div className="FLcontainer">
            <div className="FLleftPannel">
            <div className="FL">
                {
                    fList.map((f,k) => {
                        return(
                        <div className="singleFollow" key={k}>
                            <button
                                value={f.age}
                                key={k}
                                onClick={(e) => {
                                    setProView(e);
                                    setProID(f.followID);
                                }}>
                                
                            
                            <img src={process.env.PUBLIC_URL+`${f.img_url}`} alt="" />
                            <h4>{f.name}</h4>
                            </button>
                        </div>
                        )
                    })
                }
            </div>
            </div>
                
            <div className="FLrightpannel">
                    <FP
                    profile={profile}
                    right={right}
                    session={session}
                    proID={proID}
                    />
                </div> 
        </div>
    );
};



export default Followlistleft;
