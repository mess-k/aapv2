import React from 'react';
import "./followlist.css"
import { useEffect,useState } from 'react';
import axios from 'axios';
import FP from "../FollowList/FollowPreview"


const FollowList = props => {
    const [session, setSession] = useState()
    const [fList, setFList] = useState([])
    const [right, setRight] = useState(false)
    const [profile, setProfile]=useState([])
    const [proID, setProID] = useState()

    // console.log(fList)
    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);

            }
        });
    }, [props]);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/find/profiles/follow`)
        .then((res) => {
                setFList(res.data);
                console.log(res.data)
            
        });
    }, [props]);


    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/profile/find/random`)
    //     .then((res) => {
    //             setProfile(res.data)
            
    //     });
    // }, [props]);
    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/profile/find`,profile)
    //     .then((res) => {
    //             setProfile(res.data)
    //             setRight(true)
    //             console.log(profile)
            
    //     });
    // }, [props]);

    const setProView = (e) =>{
        e.preventDefault()
        const profileID = proID
        console.log(profileID)
        axios.get("http://localhost:8000/api/profile/find",{params:{id: profileID}} )
            .then(res => {
                setProfile(res.data)
                console.log(profile)
                setRight(true)
            })
    }

    return (
        <>
        {
            session ? 
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
                    />
                </div>: 
            </div>
        : !session
        }
        </>
    );
};



export default FollowList;