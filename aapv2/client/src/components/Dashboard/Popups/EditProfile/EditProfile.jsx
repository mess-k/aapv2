import React from "react"
import EditPopUpForm from "./EditPopUpForm"

const EditProfile = (props) => {
    const {editPopUp,profile,session} = props
    

    return(  
        <>      
        {
            editPopUp ?
            <div>
            <EditPopUpForm
            profile={profile}
            session={session}
            />
            </div>
            : !editPopUp
        }
        </>
    )
}


export default EditProfile