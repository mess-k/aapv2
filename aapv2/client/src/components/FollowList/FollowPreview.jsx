import React from 'react';
import ProPreView from "../Profile/Page/ProfilePreview2"


const FollowPreview = props => {
    const {right,profile}= props

    
    return (
        <>
        {
            right ?
            <div>
                <ProPreView
                profile={profile}
                />
            </div>
            : <h1>FALSE</h1>
        }
        </>
    );
};


export default FollowPreview;