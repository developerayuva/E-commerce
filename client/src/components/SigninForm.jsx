import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SigninForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })

        const json = await response.json();
        if(json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={handleChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name="password" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
        </form>
    )
}

export default SigninForm;