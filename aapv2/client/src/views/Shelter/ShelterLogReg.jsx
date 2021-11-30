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
    
    const [log,setLog] = useState({
        email: "",
        password:""
    })
    const [errors,setErrors] = useState();
    const [pwErrors,setPwErrors] = useState(false);
    const[logErr,setLogErr] = useState(false);
    const[lPErr,setLPErr] = useState(false);

    const [flash,setFlash]  = useState(false)

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
            .then(res => {
                if(res.data.message || res.data.pwMessage){
                    // navigate("/")
                    setErrors(res.data.message)
                    setPwErrors(res.data.pwMessage)
                }
                if(!res.data.message && !res.data.pwMessage){
                    setFlash(true)
                    setErrors(false)
                    setPwErrors(false)
                    navigate('/')
                }
        })
    };
    const handleLogin = e =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/shelter/login",log)
        .then(res => {
            if(res.data.message || res.data.EPMessage){
                setLogErr(res.data.message)
                setLPErr(res.data.EPMessage)
            }
            if(!res.data.message && !res.data.EPMessage){
                setLoginStatus(res.data.shelter)
                navigate("/dashboard")
            }
        })
    };


    return (
        <>
            <HomeLogo/>
            <div>
                <ShelterForm
                inputs={shelter}
                flash={flash}
                errors={errors}
                pwErrors={pwErrors}
                logErr={logErr}
                LEPErr={lPErr}
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