import React from 'react';


const FollowPreview = props => {
    const {FID,right}= props

    console.log(FID)

    return (
        <>
        {
            right ?
            <div>
                <h1>WORKING!</h1>
            </div>
            : <h1>FALSE</h1>
        }
        </>
    );
};


export default FollowPreview;