import React from 'react';
import {useState,useEffect} from  "react";
import axios from "axios";
import PicForm from '../../components/HomePage/PicForm';
import Nav from '../../components/Nav/Nav';
// import ReactCrop from 'react-image-crop';
// import { navigate } from '@reach/router';
import 'react-image-crop/dist/ReactCrop.css';

axios.defaults.withCredentials = true;

const UploadProPic = props => {

    const [session, setSession] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                console.log(res.data.loggedIn)
                console.log(res.data.user)
                setSession(res.data.user[0]);
                console.log(session)
            }
        });
    }, [props]);

    return (
        <>
            <Nav/>
            <PicForm
            session={session}
            />
        </>
    );
}

export default UploadProPic;