import React from 'react';
// import {Router} from "@reach/router";
import SNav from "../../components/Nav/SNav"
import {useState,useEffect} from  "react";
import axios from "axios";
import SP from "../../components/Dashboard/ShelterPanel"
import PP from "../../components/Dashboard/Profile/ProfilePannel"

axios.defaults.withCredentials = true;


const Dashboard = props => {
    const [session, setSession] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0]);
            }
        });
    }, [props]);


    return (
        <>
            <SNav/>
            <SP
            session={session}
            />
            <PP
            session={session}
            />
        </> 
    );
}

export default Dashboard;