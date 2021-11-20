import React from 'react';
import "./HL.css"
import HL from "../../img/logo.png"

function HomeLogo(props) {
    return (
        <div className="HL">
            <a href="/"><img src={HL} alt="logo" /></a>
        </div>
    );
}

export default HomeLogo;