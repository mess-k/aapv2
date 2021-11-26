import React from 'react';
import {useState,useEffect} from  "react";
import axios from "axios";
import SNav from '../../components/Nav/SNav';
import SPicForm from '../../components/Dashboard/SPicForm';
// import ReactCrop from 'react-image-crop';
// import { navigate } from '@reach/router';
import 'react-image-crop/dist/ReactCrop.css';

axios.defaults.withCredentials = true;

const UploadShelterPic = props => {

    const [session, setSession] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                // console.log(res.data.loggedIn)
                // console.log(res.data.shelter)
                setSession(res.data.shelter[0]);
                // console.log(session)
            }
        });
    }, [props]);

    return (
        <>
            <SNav/>
            <SPicForm
            session={session}
            />
        </>
    );
}

export default UploadShelterPic;