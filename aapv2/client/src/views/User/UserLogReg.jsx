import React from 'react';
import HomeLogo from '../../components/HL/HomeLogo';
import UserForm from "../../components/LRForms/ULRForm";
import {useState} from  "react";
import { navigate } from "@reach/router";
import axios from "axios";
import {Link} from "@reach/router"


axios.defaults.withCredentials = true;

const UserLogReg = props => {

    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword:""
    })
    const [errors,setErrors] = useState()
    const [log,setLog] = useState({
        email: "",
        password:""
    })
    const [pwErrors,setPwErrors] = useState(false)
    const [loginStatus, setLoginStatus] = useState([]);
    const [flash,setFlash]  = useState(false)


    const handleChange = e =>{
        setUser({
            ...user,
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

        axios.post("http://localhost:8000/api/user/register",user)
            .then((res) => {
                if(res.data.message || res.data.pwMessage){
                    // navigate("/")
                    setErrors(res.data.message)
                    setPwErrors(res.data.pwMessage)
                }
                if(!res.data.message && !res.data.pwMessage){
                    setFlash(true)
                    navigate('/')
                }
            })
    };
    const handleLogin = e =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/login",log)
            .then(res => {
                if(!res.data.message){
                    setLoginStatus(res.data.user)
                    navigate("/home")
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
                <UserForm
                inputs={user}
                flash={flash}
                pwErrors={pwErrors}
                errors={errors}
                logInputs={log}
                title="Create User"
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
                <Link to="/shelter">Shelter Login/Register</Link>
            </div>
        </>
    )
};

export default UserLogReg;