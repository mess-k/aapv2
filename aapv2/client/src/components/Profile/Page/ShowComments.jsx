import React from 'react';
import "./Profile.css"


const ShowComments = props => {
    const {ShowComs,showCom} = props
    // const [comList,setComList] = useState([])
    


    return (
        showCom ? 
        <div className="comms">
            <div>
                <form onSubmit={ShowComs}>
                    <input 
                    type="submit" value="Hide Comments" 
                    className="L_C"
                    // showCom={showCom}
                    // postID={postID}
                    />
                </form>
            </div>
        </div>
        : <div>
            <form onSubmit={ShowComs}>
                <input 
                type="submit" value="Comments" 
                className="L_C"
                // showCom={showCom}
                // postID={postID}
                />
            </form>
        </div>
        
    );
};


export default ShowComments;