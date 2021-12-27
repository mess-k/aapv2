import React from 'react';
// import {Router} from "@reach/router";
import SPNav from "../../components/Nav/SPNav"
import {useState,useEffect} from  "react";
import axios from "axios";
import Pro from "../../components/Dashboard/Profile/Page/ProflieBody"
import Page from "../../Style/PageBody"

axios.defaults.withCredentials = true;


const Profile = props => {
    const [session, setSession] = useState([])
    const [profile, setProfile] = useState()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0]);
            }
        });
    }, [props]);

    useEffect(() => {
        const profileID = props.id
        axios.get(`http://localhost:8000/api/profile/find`, {params:{id: profileID}})
        .then((res) => {
            setProfile([res.data[0]])
        });
    }, [props]);

    return (
        <>
            <SPNav/>
            <Page>
            </Page>
            <Pro
            profile={profile}
            session={session}
            />
        </> 
    );
}

export default Profile;