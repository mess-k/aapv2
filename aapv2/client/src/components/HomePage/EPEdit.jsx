import React from 'react';
import {useEffect} from  "react";

const EPEdit = props => {
    const {session} = props;

    const {inputs,handleInputChange,handleSubmit,submitValue} = props;

    useEffect(() => {
        console.log(session)
    }, [session])


    return (
        session ?
        <div>
            <div className="logreg justify-content-center">
                <div>
                    <h1>Edit Profile</h1>
                    
                    <form onSubmit={handleSubmit} className="card col-20">
                        <label htmlFor="name" >First Name:</label>
                        <input 
                            type="text" 
                            name="firstName"
                            placeholder={session.first_name}
                            onChange={handleInputChange}
                            value={inputs.firstName}
                        />
                        {/* <span className="text-danger">
                            {errors.firstName ? errors.firstName.message: ""}
                        </span> */}
                        <label htmlFor="name">Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder={session.last_name}
                            onChange={handleInputChange}
                            value={inputs.lastName}
                        />
                        {/* <span className="text-danger">
                            {errors.lastName ? errors.lastName.message: ""}
                        </span> */}
                        <label htmlFor="name">Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder={session.email}
                            onChange={handleInputChange}
                            value={inputs.email}
                        />
                        {/* <span className="text-danger">
                            {errors.email ? errors.email.message: ""}
                        </span> */}
                        <label htmlFor="name">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleInputChange}
                            value={inputs.password}
                        />
                        {/* <span className="text-danger">
                            {errors.password ? errors.password.message: ""}
                        </span> */}
                        <label htmlFor="name">Confirm Password:</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            onChange={handleInputChange}
                            value={inputs.confirmPassword}
                        />
                        {/* <span className="text-danger">
                            {errors.confirmPassword ? errors.confirmPassword.message: ""}
                        </span> */}
                        <input type="submit" value={submitValue} className="btn btn-info"/>
                    </form>
                </div>
            </div> 
        </div> : <h1>Youve been Logged out</h1>
    );
}

export default EPEdit;