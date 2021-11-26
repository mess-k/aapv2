import React from 'react';

const EPEdit = props => {
    const {inputs,handleInputChange,handleSubmit,submitValue,session} = props;

    return (
        <div>
            {
                session.map((s,k)=>{
                    return(
                        <form onSubmit={handleSubmit} className="card col-20" key={k}>
                            <label htmlFor="name" >First Name:</label>
                            <input 
                                type="text" 
                                name="firstName"
                                placeholder={s.first_name}
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
                                placeholder={s.last_name}
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
                                placeholder={s.email}
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
                    )
                })
            }
        </div>
    );
}

export default EPEdit;