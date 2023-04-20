import React from 'react';
import Nav from "../../components/Nav/Nav"
import {useEffect,useState} from  "react";
import UserCom from "../../components/HomePage/User2UserPreview"
import Page from "../../Style/PageBody"
import axios from 'axios';


const ShelterView = props => {
    const [user, setUser] = useState([])
    const [puser, setPuser] = useState([])
    const[posts,setPosts] = useState([])
    const[uID,setUID] = useState([])
    const {session,puid,userViewID} = props

    useEffect(() => {
        const UID = props.id
        axios.get(`http://localhost:8000/api/user/find`, {params:{id: UID}})
        .then((res) => {
            setUser([res.data[0]])
            setUID(res.data[0].id)
        });
    }, [props]);
    useEffect(() => {
        const pUid = puid
        axios.get(`http://localhost:8000/api/user/find`, {params:{id: pUid}})
        .then((res) => {
            setPuser([res.data[0]])
            setUID(res.data)
        });
    }, [puid]);

    useEffect(() => {
        const profileID = props.id
        axios.get('http://localhost:8000/api/user/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data)
        })
    },[props])
    console.log(props.id)

    return (
        <>
            <Nav/>
            <Page>
            </Page>
            <UserCom
            pUser={puser}
            user={user}
            session={session}
            uid={uID}
            userViewID={props.id}
            posts={posts}
            />
        </> 
    );

}



export default ShelterView;