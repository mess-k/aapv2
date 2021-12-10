import  React from "react";
import styled from "styled-components"

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PopUpWrapper = styled.div`
    display:flex;
    text-align:center;
    flex-direction:column;
    width: 1000px;
    height: 800px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    margin-top: -150px;
    overflow:hidden;
`;
const PopUpContent = styled.div`

`;


const CreatePost = (props) =>{
    const{profile,session,PostPopUp} = props


    return(
        <>
        {
            PostPopUp ? 
            <Background>
                <PopUpWrapper>
                    <div className="postBody">
                        
                    </div>
                </PopUpWrapper>
            </Background>
        : !PostPopUp
        }
        </>
    )
}

export default CreatePost