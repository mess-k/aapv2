import React from 'react';
// import {Router} from "@reach/router";
import Nav from "../../components/Nav/Nav"
import {useState,useEffect} from  "react";
import axios from "axios";
import SP from "../../components/Dashboard/ShelterPanel"

axios.defaults.withCredentials = true;


const Dashboard = props => {
    const [session, setSession] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                console.log(res.data.loggedIn)
                console.log(res.data.shelter)
                setSession(res.data.shelter[0]);
                // console.log(session)
            }
        });
    }, [props]);


    return (
        <>
            <Nav/>
            <SP
            session={session}
            />
        </>
    );
}

export default Dashboard;