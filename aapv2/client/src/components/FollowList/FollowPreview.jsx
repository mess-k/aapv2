import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
import ProPreView from "../Profile/Page/ProfilePreview"



const FollowPreview = props => {
    const {proID,right,profile}= props
    
    const[posts,setPosts] = useState()
    // const [profile, setProfile] = useState([])

    console.log(proID)
    useEffect(() => {
        const profileID = proID
        axios.get('http://localhost:8000/api/profile/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data)
            
        })
    },[proID])

    // useEffect(() => {
    //     const profileID = proID
    //     console.log(proID)
    //     axios.get(`http://localhost:8000/api/profile/find`, {params:{id: profileID}})
    //     .then((res) => {
    //         setProfile([res.data[0]])
    //     });
    // }, [proID]);

    // console.log(profile)

    
    return (
        <>
        {
            right?
            <div className="profile2">
                <ProPreView
                profile={profile}
                posts={posts}
                />
            </div>
                :!right
            
        }
        </>
    );
};


export default FollowPreview;