import React from 'react';
import HomeLogo from '../../components/HL/HomeLogo';
import ShelterForm from "../../components/LRForms/SLRForm";
import {useState} from  "react";
import { navigate } from "@reach/router";
import axios from "axios";
import {Link} from "@reach/router"


axios.defaults.withCredentials = true;

const ShelterLogReg = props => {

    const [shelter,setShelter] = useState({
        shelterName: "",
        email: "",
        password: "",
        confirmPassword:""
    })
    // const [errors,setErrors] = useState({
    //     shelterName: "",
    //     email: "",
    //     password:""
    // })
    const [log,setLog] = useState({
        email: "",
        password:""
    })
    // const [logErrors,setLogErrors] = useState({
    //     email: "",
    //     password:""
    // })

    const [loginStatus, setLoginStatus] = useState([]);


    const handleChange = e =>{
        setShelter({
            ...shelter,
            [e.target.name]: e.target.value
        })
    };
    const handleLogChange = e =>{
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = e =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/shelter/register",shelter)
            .then(res => console.log("something"))
        .catch(err => {
            console.log(err)
        })
    };
    const handleLogin = e =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/shelter/login",log)
            .then(res => {
                if(!res.data.message){
                    navigate("/dashboard")
                    setLoginStatus(res.data.user)
                }
            })
        .catch(err => {
            console.log(err.message)
        })
    };


    return (
        <>
            <HomeLogo/>
            <div>
                <ShelterForm
                inputs={shelter}
                logInputs={log}
                title="Create Shelter"
                submitValue="Register"
                handleInputChange={handleChange}
                handleLogChange = {handleLogChange}
                handleSubmit={handleSubmit}
                handleLogin = {handleLogin}
                // errors={errors}
                // logErrors={logErrors}
                session={loginStatus}
            />
            </div>
            <div className="text-center mt-20" >
                <Link to="/">User Login/Register</Link>
            </div>
        </>
    )
};

export default ShelterLogReg;