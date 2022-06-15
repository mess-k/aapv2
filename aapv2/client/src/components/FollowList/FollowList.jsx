import React from 'react';
import "./followlist.css"
import { useEffect,useState } from 'react';
import axios from 'axios';
import FP from "../FollowList/FollowPreview"
import Followleft from "./Followlistleft"


const FollowList = props => {
    const [session, setSession] = useState()
    const [fList, setFList] = useState([])
    const [right, setRight] = useState(false)
    const [profile, setProfile]=useState([])
    const [proID, setProID] = useState()
    

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

    const setProView = () =>{
        // e.preventDefault()
        const profileID = proID
        // setRight(true)
        console.log(profileID)
        axios.get("http://localhost:8000/api/profile/find",{params:{id: profileID}} )
            .then(res => {
                setProfile(res.data)
                console.log(profile)
                setRight(true)
                // window.location.reload()
            })
    }

    return (
        <>
        {
            session ? 
            <div className="FLcontainer">
                <div className="FLleftPannel">
                    {/* <Followleft
                        setProView={setProView}
                        profile={profile}
                        right={right}
                        session={session}
                        setProID={setProID}
                        flist={fList}
                    /> */}
                    <div className="FL">
                        {
                            fList.map((f,k) => {
                                return(
                                <div className="singleFollow" key={k}>
                                    <button
                                        value={f.age}
                                        key={k}
                                        onClick={() => {
                                            setProView();
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
                    // profile={profile}
                    right={right}
                    session={session}
                    proID={proID}
                    fList={fList}
                    profile={profile}
                    />
                </div> 
            </div>
        : !session
        }
        </>
    );
};



export default FollowList;