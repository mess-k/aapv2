import React from 'react';
// import {Router} from "@reach/router";
import SPNav from "../../components/Nav/SPNav"
import {useState,useEffect} from  "react";
import axios from "axios";
import Pro from "../../components/Profile/Page/ProflieBody"
import Page from "../../Style/PageBody"

axios.defaults.withCredentials = true;


const Profile = props => {
    const [profile, setProfile] = useState([])
    const[posts,setPosts] = useState([])
    const {session,profiles} = props

    console.log(session)
    console.log(profiles)

    useEffect(() => {
        const profileID = props.id
        axios.get(`http://localhost:8000/api/profile/find`, {params:{id: profileID}})
        .then((res) => {
            setProfile([res.data[0]])
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
            <SPNav/>
            <Page>
            </Page>
            <Pro
            profile={profile}
            session={session}
            posts={posts}
            />
        </> 
    );
}

export default Profile;