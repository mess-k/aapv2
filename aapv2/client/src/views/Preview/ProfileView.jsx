import React from 'react';
import Nav from "../../components/Nav/Nav"
import {useEffect,useState} from  "react";
import Pro from "../../components/Profile/Page/ProfilePreview"
import Page from "../../Style/PageBody"
import axios from 'axios';

const ProfileView = props => {
    const [profile, setProfile] = useState([])
    const[posts,setPosts] = useState([])
    const[sID,setSID] = useState([])
    const {session} = props

    useEffect(() => {
        const profileID = props.id
        axios.get(`http://localhost:8000/api/profile/find`, {params:{id: profileID}})
        .then((res) => {
            setProfile([res.data[0]])
            setSID(res.data[0].uploader_id)
        });
    }, [props]);

    useEffect(() => {
        const profileID = props.id
        axios.get('http://localhost:8000/api/profile/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data)
        })
    },[props])

    return (
        <>
            <Nav/>
            <Page>
            </Page>
            <Pro
            profile={profile}
            session={session}
            posts={posts}
            sID={sID}
            />
        </> 
    );

}

export default ProfileView