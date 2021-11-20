import React from 'react';

const SLRForm = props => {

    const {inputs,handleInputChange,handleLogChange,logInputs,handleSubmit,handleLogin,submitValue,errors} = props;

    return (
        <div className="logreg d-flex justify-content-evenly">
            <div>
                <h1>User Registration</h1>
                <form onSubmit={handleSubmit} className="card col-20">
                    <label htmlFor="name">Shelter Name:</label>
                    <input 
                        type="text" 
                        name="shelterName" 
                        onChange={handleInputChange}
                        value={inputs.firstName}
                    />
                    <span className="text-danger">
                        {errors.firstName ? errors.firstName.message: ""}
                    </span>
                    <label htmlFor="name">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        onChange={handleInputChange}
                        value={inputs.email}
                    />
                    <span className="text-danger">
                        {errors.email ? errors.email.message: ""}
                    </span>
                    <label htmlFor="name">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleInputChange}
                        value={inputs.password}
                    />
                    <span className="text-danger">
                        {errors.password ? errors.password.message: ""}
                    </span>
                    <label htmlFor="name">Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleInputChange}
                        value={inputs.confirmPassword}
                    />
                    <span className="text-danger">
                        {errors.confirmPassword ? errors.confirmPassword.message: ""}
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

export default SLRForm;