import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

function Signin() {
    return (
        <div>
            <div className="modal fade" id="signInToggle" aria-hidden="true" aria-labelledby="signInToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="signInToggleLabel">Signin to continue your shopping</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SigninForm />
                        </div>
                        <div className="modal-footer">
                            <div className="text-muted fst-light fst-italic text-decoration-underline" data-bs-target="#signUpToggle" data-bs-toggle="modal" id="modal-button">New to deliv <strong>Signup</strong> instead</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="signUpToggle" aria-hidden="true" aria-labelledby="signUpToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="signUpToggleLabel">Welcome to Deliv</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SignupForm />
                        </div>
                        <div className="modal-footer">
                            <div className="text-muted fst-light fst-italic text-decoration-underline" data-bs-target="#signInToggle" data-bs-toggle="modal" id="modal-button">Already have an account <strong>Signin</strong> instead! </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;