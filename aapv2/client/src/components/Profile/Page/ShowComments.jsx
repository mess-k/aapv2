import React from 'react';
import {useState,useEffect} from "react"
import axios from 'axios';


const ShowComments = props => {
    const {postID,showCom} = props
    const [comList,setComList] = useState([])

    
        useEffect(()=>{
            
            const post_ID = postID
            axios.get("http://localhost:8000/api/profile/show/comments",{params:{id: post_ID}})
                .then (res => {
                    setComList(res.data)
                    
                })
                .catch (err => {
                    console.log(err)
                }) 
        },[postID])

    return (
            showCom ? 
            <div className="comms">
                {
                    comList.map((com,i)=>{
                        return(
                            <div className="singlecomm" key={i}>
                                <p>{com.comment}</p>
                            </div>
                            )
                        })
                    }
            </div>
            : <p>not something</p>
    );
};


export default ShowComments;