import React from "react"
import SPEdit from "./SPEdit"

const EditProfile = (props) => {
    const {editShelter,session} = props

    
    
    return(  
        <>      
        {
            editShelter ?
            <div>
            <SPEdit
            session={session}
            />
            </div>
            : !editShelter
        }
        </>
    )
}
export default EditProfile