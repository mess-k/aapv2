import React from 'react';
import {useState,useEffect} from "react"
import axios from 'axios';

const SFollow = props => {
    const {proID,sessionID} = props
    const [session, setSession] = useState()
    const [following, setFollowing] = useState({
        profileID:`${proID}`,
        userID:`${sessionID}`
    })
    const [findFollow, setFindFollow] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/login`)
        .then((res) => {
            if (res.data.loggedIn === true) {
                setSession(res.data.user[0]);
            }
        });
    }, [props]);

    useEffect(() =>{
        const s_ID = proID
        axios.get("http://localhost:8000/api/user/find/shelter/follow",{params:{id: s_ID}})
            .then(res => {
                setFindFollow(res.data)
            })
    })

    const Follow = (e) =>{ 
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/user/follow/shelter",following)
            .then (res => {
                // setLike()
                setFindFollow(prev => !prev)
            })
            .catch (err => {
                console.log(err)
            }) 
        }
        const unFollow = (e) =>{ 
            e.preventDefault()
            const SID = proID
            axios.delete(`http://localhost:8000/api/user/follow/shelter`,{params:{id: SID}})
                .then (res => {
                    // setLike(prev => !prev)
                    setFindFollow(prev => !prev)
                })
                .catch (err => {
                    console.log(err)
                }) 
        }



    return (
        session ? 
        <div>
            {
                findFollow ? 
                <form onSubmit={unFollow}>
                <input 
                    type="submit" 
                    className='follow_button' 
                    value="Following" 
                />
                <input 
                    type="hidden" 
                    name="proID" 
                    value={proID}
                />
                <input 
                    type="hidden" 
                    name="userID" 
                    value={sessionID}
                />
            </form>
            :
            <form onSubmit={Follow}>
                <input 
                    type="submit" 
                    className='follow_button' 
                    value="Follow" 
                />
                <input 
                    type="hidden" 
                    name="proID" 
                    value={proID}
                    />
                <input 
                    type="hidden" 
                    name="userID" 
                    value={sessionID}
                />
            </form>
            }
        </div>
        : !session
    );
};


export default SFollow;