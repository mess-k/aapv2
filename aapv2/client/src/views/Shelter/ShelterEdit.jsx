import React from 'react';
import axios from "axios";
import {useState,useEffect} from  "react";
import Nav from "../../components/Nav/Nav"
import SPEdit from "../../components/Dashboard/Shelter/Edit/SPEdit"
import { navigate } from '@reach/router';

axios.defaults.withCredentials = true;


const ShelterEdit = props => {
    const [shelter,setShelter] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword:""
    })

    const [session, setSession] = useState([])

    const handleChange = e =>{
        setShelter({
            ...shelter,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e =>{
        e.preventDefault();

        axios.put("http://localhost:8000/api/shelter/edit",shelter)
            .then((res) => {
                if(res){
                    navigate("/dashboard")
                }
            })
        .catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                // console.log(res.data.loggedIn)
                // console.log(res.data.Shelter)
                setSession([res.data.shelter[0]]);
                // console.log(session)
            }
            else{
                console.log("fail")
            }
        });
    }, [props]);

    return (
        <>
            <Nav/>
            <SPEdit
            inputs={shelter}
            title="Update Shelter"
            handleInputChange={handleChange}
            handleSubmit={handleSubmit}
            session={session}
            />
        </>
    );
}

export default ShelterEdit;
