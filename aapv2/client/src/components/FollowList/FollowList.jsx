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


    useEffect(() => {
        axios.get(`http://localhost:8000/api/profile/find/random`)
        .then((res) => {
                setProfile(res.data)
            
        });
    }, [props]);

    const setProView = (e) =>{
        setRight(prev => !prev)
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
                                        FID={f.proID}
                                        onClick={setProView}
                                        right={right}
                                        key={k}
                                    >
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
                        {
                            right?
                            <FP
                            FID={}
                            /> : !right
                        }
                </div>: 
            </div>
        : !session
        }
        </>
    );
};



export default FollowList;