import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });

    function handleChange(event) {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fName: credentials.fName, lName: credentials.lName, email: credentials.email, password: credentials.password, passwordConfirmation: credentials.passwordConfirmation})
        })

        const json = await response.json();
        if(json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            alert(`${json.error}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First and Middle (if any) Name</label>
                <input type="text" className="form-control" value={credentials.fName} onChange={handleChange} name="fName" id="firstName" />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" value={credentials.lName} onChange={handleChange} name="lName" id="lastName" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name="email" id="exampleInputEmail2" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name="password" id="exampleInputPassword2" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={credentials.passwordConfirmation} onChange={handleChange} name="passwordConfirmation" id="exampleInputPassword3" />
            </div>
            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
        </form>
    )
}

export default SignupForm;