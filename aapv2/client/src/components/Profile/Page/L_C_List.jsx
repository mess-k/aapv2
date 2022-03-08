import React from 'react';
import Like from "./Like"
import Show from "./ShowComments"
import List from "./ComList"
import {useState} from "react"


const L_C_List = props => {
    const {postID,sessionID,profile} = props


    const [showCom, setShowCom] = useState(false)
    

    const ShowComs = (e) =>{
        e.preventDefault()
        setShowCom (prev => !prev)
    }

    return (
        <div>
            <div className='like_comment'>
                <Like
                postID= {postID}
                sessionID={sessionID}
                profile={profile}
                />
                <Show
                postID= {postID}
                sessionID={sessionID}
                profile={profile}
                ShowComs={ShowComs}
                showCom={showCom}
                />
            </div>
            <div className="COMMENT_LIST">
                <List
                postID= {postID}
                sessionID={sessionID}
                profile={profile}
                showCom={showCom}
                />
            </div>
        </div>
    );
};


export default L_C_List;