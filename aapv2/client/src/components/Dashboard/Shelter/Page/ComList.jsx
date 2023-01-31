import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from '@reach/router';

const ComList = props => {
    const {postID,showCom} = props
    const [comList,setComList] = useState([])

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
                        <>
                            {
                                com.s_id === null ?
                            <div className="singleCom" key={i}>
                                <Link to={`/user/view/${com.compost_id}`}
                                >
                                <img src={process.env.PUBLIC_URL+`${com.u_img}`} alt="" className="ComProfilePic"/>
                                </Link>
                                <div className="comContext" >
                                    <Link to="/home"
                                    >
                                    <h4 className='nomarg'>{com.first_name}</h4>
                                    </Link>
                                    <h6 className='nomarg'>{com.comcreated_at}</h6>
                                    <h5 className='nomarg'>{com.comment}</h5>
                                </div>
                            </div>
                                :
                                <div className="singleCom" >
                                <Link to={`/shelter/view/${com.sheltercom_id}`}>
                                <img src={process.env.PUBLIC_URL+`${com.s_img}`} alt="" className="ComProfilePic"/>
                                </Link>
                                <div className="comContext" >
                                    <Link to="/home"
                                    >
                                    <h4 className='nomarg'>{com.name}</h4>
                                    </Link>
                                    <h6 className='nomarg'>{com.comcreated_at}</h6>
                                    <h5 className='nomarg'>{com.comment}</h5>
                                </div>
                                </div>
                            }
                        </>
                    )
                })
            }
        </div>: !showCom
    );
};

export default ComList;