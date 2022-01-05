import React from 'react';
import {useState} from "react"


const EditShelter = props => {
    const [editShelter, setEditShelter] = useState(false)

    const editShelterButton = e =>{
        setEditShelter(prev => !prev)
    }
}

export default EditShelter