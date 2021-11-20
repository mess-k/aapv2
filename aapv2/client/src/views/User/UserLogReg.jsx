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
    // const [errors,setErrors] = useState({
    //     firstName: "",
    //     lastName: "",
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
            .then(res => console.log("something"))
        .catch(err => {
            console.log(err)
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