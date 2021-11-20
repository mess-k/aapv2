import React from 'react';
import axios from "axios";
import {useState,useEffect} from  "react";
import Nav from "../../components/Nav/Nav"
import UPEdit from "../../components/HomePage/EPEdit"
import { navigate } from '@reach/router';

axios.defaults.withCredentials = true;


const Edit = props => {
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword:""
    })

    const [session, setSession] = useState([])

    const handleChange = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e =>{
        e.preventDefault();

        axios.put("http://localhost:8000/api/user/edit",user)
            .then((res) => {
                if(res){
                    navigate("/home")
                    setSession(res.data.user[0])
                    console.log("something")
                }
            })
        .catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                // console.log(res.data.loggedIn)
                // console.log(res.data.user)
                setSession(res.data.user[0]);
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
            <UPEdit
            inputs={user}
            title="Update User"
            handleInputChange={handleChange}
            handleSubmit={handleSubmit}
            session={session}
            />
        </>
    );
}

export default Edit;