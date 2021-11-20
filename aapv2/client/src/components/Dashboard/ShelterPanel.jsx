import {useEffect} from  "react";
import "./ShelterPanel.css"


const ShelterPanel = props => {
const {session} = props;


useEffect(() => {
    console.log(session)
}, [session])

    return (
        session ?
            <div className="card">
                <img src="" alt="" />
            <div class="container">
                <h4><b>{session.name}</b></h4>
                <p></p>
                </div>
            </div> : <h1>Return to Login page</h1>
    );
}

export default ShelterPanel;