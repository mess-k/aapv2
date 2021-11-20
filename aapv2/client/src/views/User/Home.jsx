import React from 'react';
// import {Router} from "@reach/router";
import Nav from "../../components/Nav/Nav"
import {useState,useEffect} from  "react";
import axios from "axios";
import UP from "../../components/HomePage/UserPanel"

axios.defaults.withCredentials = true;


const Home = props => {
    const [session, setSession] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                // console.log(res.data.loggedIn)
                // console.log(res.data.user)
                setSession(res.data.user[0]);
                // console.log(session)
            }
        });
    }, [props]);




    return (
        <>
            <Nav/>
            <UP
            session={session}
            />
        </>
    );
}

export default Home;