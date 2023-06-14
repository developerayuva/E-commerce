import React from "react";

function SignupForm() {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First and Middle (if any) Name</label>
                <input type="text" className="form-control" id="firstName" />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword3" />
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
    )
}

export default SignupForm;