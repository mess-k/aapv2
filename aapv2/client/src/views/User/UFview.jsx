import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Page from "../../Style/PageBody"
import Nav from "../../components/Nav/Nav"
import PFlist from "../../components/FollowList/FollowList"

const UFview = props => {
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
        <>
            <Nav/>
            <Page>
            </Page>
            <PFlist
            session={session}
            />
        </>
    );
};



export default UFview;