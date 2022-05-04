import React from "react"
import styled from "styled-components"
import {useEffect,useState} from  "react";
import axios from "axios";
import {useSpring,animated } from "react-spring"
import SP from "./SPEdit"

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:11;
`;



const EditPopUpForm = props => {
    const {editShelterButton,editShelter} = props
    const [session, setSession]=useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/shelter/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.shelter[0])
            }
        });
    }, [props]);

    const animation = useSpring ({
        config: {
            duration:250
        },
        opacity: editShelter ? 1:0,
        transform: editShelter ? `translateY(0%)` : `translateY(-100%)`
    })


    return(
        <>
        {
        editShelter ? (
        <Background>
            <animated.div style={animation}>
            <SP
            session={session}
            editShelter={editShelter}
            editShelterButton={editShelterButton}
            />
            </animated.div>
        </Background> ): !editShelter
        }
        </>
    )
}

export default EditPopUpForm