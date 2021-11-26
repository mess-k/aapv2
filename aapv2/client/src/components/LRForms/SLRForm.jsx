import React from 'react';

const SLRForm = props => {

    const {inputs,handleInputChange,handleLogChange,logInputs,handleSubmit,handleLogin,submitValue,logErr,LEPErr} = props;

    return (
        <div className="logreg d-flex justify-content-evenly">
            <div>
                <h1>Shelter Registration</h1>
                <form onSubmit={handleSubmit} className="card col-20">
                    <label htmlFor="name">Shelter Name:</label>
                    <input 
                        type="text" 
                        name="shelterName" 
                        onChange={handleInputChange}
                        value={inputs.shelterName}
                    />
                    {/* <span className="text-danger">
                        {errors.firstName ? errors.firstName.message: ""}
                    </span> */}
                    <label htmlFor="name">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
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
            <div className="log">
                <h1>Shelter Login</h1>
                <form onSubmit={handleLogin} className="card mb-100">
                    <label htmlFor="name">Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            onChange={handleLogChange}
                            value={logInputs.email}
                        />
                        <span className="text-danger">
                        {logErr ? logErr: ""}
                        </span> 
                        <label htmlFor="name">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleLogChange}
                            value={logInputs.confirmPassword}
                        /> 
                        <span className="text-danger">
                            {LEPErr ? LEPErr: ""}
                        </span>
                        <input type="submit" value="Login" className="btn btn-info"/>
                </form> 
            </div>
        </div>
    );
};

export default SLRForm;