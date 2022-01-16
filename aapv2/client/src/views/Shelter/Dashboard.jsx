import React from 'react';
// import {Router} from "@reach/router";
import SNav from "../../components/Nav/SPNav"
import {useState,useEffect} from  "react";
import axios from "axios";
import SP from "../../components/Dashboard/Shelter/Page/Dashpage"
// import PP from "../../components/Profile/Pannel/ProfilePannel.jsx"
import Page from "../../Style/PageBody"

axios.defaults.withCredentials = true;

const Dashboard = props => {
    const [session, setSession] = useState([])
    const[posts,setPosts] = useState([])
    const [profiles, setProfiles]=useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setProfiles(res.data.profiles)
            }
        });
    }, [props]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0]);
            }
        });
    }, [props]);

    useEffect(() => {
        const shelterID = session.id
        axios.get('http://localhost:8000/api/shelter/show/posts',{params:{id: shelterID}})
        .then( res => {
            setPosts(res.data)
        })
    },[session])

    return (
        <>
            <SNav/>
            <Page>
            </Page>
            <SP
            posts={posts}
            session={session}
            profiles={profiles}
            />
            {/* <PP
            session={session}
            /> */}
        </> 
    )
}

export default Dashboard;