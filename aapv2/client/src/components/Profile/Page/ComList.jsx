import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

const ComList = props => {
    const {postID,showCom} = props
    const [comList,setComList] = useState([])

    // console.log(postID)

    useEffect(()=>{
            
        const post_ID = postID
        axios.get("http://localhost:8000/api/user/show/comments",{params:{id: post_ID}})
            .then (res => {
                setComList(res.data)
                
            })
            .catch (err => {
                console.log(err)
            }) 
    },[postID])

    console.log(comList)

    return (
        showCom?
        <div className='comList'>
            {
                comList.map((com,i)=>{
                    return(
                        <div className="singleCom" key={i}>
                            <img src={process.env.PUBLIC_URL+`${com.img_url}`} alt="" className="ComProfilePic"/>
                            <div className="comContext">
                                <p className='nomarg'>{com.first_name}</p>
                                <h5 className='nomarg'>{com.comment}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>: !showCom
    );
};


export default ComList;