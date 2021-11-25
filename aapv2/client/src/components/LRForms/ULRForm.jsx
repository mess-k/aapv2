import React from 'react';
import FlashMessage from  "react-flash-message"

const ULRForm = props => {

    const {inputs,handleInputChange,handleLogChange,logInputs,handleSubmit,handleLogin,submitValue,errors,pwErrors,flash} = props;

    return (
        <div className="logreg d-flex justify-content-evenly">
            <div>
                { flash &&  
                    <div className="flash">
                        <FlashMessage duration={10000}>
                            <strong>Registration successful,try logging in!</strong>
                        </FlashMessage>
                    </div>
                }
                <h1>User Registration</h1>
                <form onSubmit={handleSubmit} className="card col-20">
                    <label htmlFor="name">First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        onChange={handleInputChange}
                        value={inputs.firstName}
                    />
                    <label htmlFor="name">Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        onChange={handleInputChange}
                        value={inputs.lastName}
                    />
                    <label htmlFor="name">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        onChange={handleInputChange}
                        value={inputs.email}
                    />
                    <span className="text-danger">
                        {errors ? errors: ""}
                    </span>
                    <label htmlFor="name">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleInputChange}
                        value={inputs.password}
                    />
                    <label htmlFor="name">Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleInputChange}
                        value={inputs.confirmPassword}
                    />
                    <span className="text-danger" duration={5000}>
                        {pwErrors ? pwErrors: ""}
                    </span>
                    <input type="submit" value={submitValue} className="btn btn-info"/>
                </form>
            </div>
            <div className="log">
                <h1>User Login</h1>
                <form onSubmit={handleLogin} className="card mb-100">
                    <label htmlFor="name">Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={handleLogChange}
                            value={logInputs.email}
                        />
                        <label htmlFor="name">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleLogChange}
                            value={logInputs.confirmPassword}
                        /> 
                        <input type="submit" value="Login" className="btn btn-info"/>
                </form> 
            </div>
        </div>
    );
};

export default ULRForm;