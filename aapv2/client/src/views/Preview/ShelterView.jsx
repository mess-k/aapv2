import React from 'react';
import Nav from "../../components/Nav/Nav"
import {useEffect,useState} from  "react";
import ShelterCom from "../../components/Shelter/ShelterPreView"
import Page from "../../Style/PageBody"
import axios from 'axios';


const ShelterView = props => {
    const [shelter, setShelter] = useState([])
    const[posts,setPosts] = useState([])
    const {session} = props
    console.log(props)

    useEffect(() => {
        const SID = props.id
        axios.get(`http://localhost:8000/api/shelter/find`, {params:{id: SID}})
        .then((res) => {
            setShelter([res.data[0]])
        });
    }, [props]);

    useEffect(() => {
        const profileID = props.id
        axios.get('http://localhost:8000/api/shelter/show/posts',{params:{id: profileID}})
        .then( res => {
            setPosts(res.data)
        })
    },[props])

    return (
        <>
            <Nav/>
            <Page>
            </Page>
            <ShelterCom
            shelter={shelter}
            session={session}
            posts={posts}
            />
        </> 
    );

}



export default ShelterView;