import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
import ProPreView from "../Dashboard/Shelter/Page/SFollowView"

const SFollowPreview = props => {
    const {proID,right}= props
    
    const[posts,setPosts] = useState()
    const[profile,setProfile] = useState([])
    const [session, setSession]=useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0])
            }
        });
    }, [props]);


    useEffect(() => {
        const profileID = proID
        axios.get('http://localhost:8000/api/shelter/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data)
        })
    },[proID])

    useEffect(() => {
        const profileID = proID
        axios.get(`http://localhost:8000/api/shelter/find`, {params:{id: profileID}})
        .then((res) => {
            setProfile(res.data[0])
        });
    }, [proID]);



    
    return (
        <>
        {
            right?
            <div className="profile2">
                <ProPreView
                profile={profile}
                posts={posts}
                session={session}
                />
            </div>
                :!right
            
        }
        </>
    );
};


export default SFollowPreview;