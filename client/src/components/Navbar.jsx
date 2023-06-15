import React, { useContext, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Signin from "./Signin";
import { useRef } from "react";
import UserContext from "../context/User/UserContext";
import delivLogo from "../images/Deliv_logo.png"

function Navbar() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const contextUser = useContext(UserContext);
  const {user, setUser, getUserDetails} = contextUser;

  useEffect(() => {
    if(localStorage.getItem('token')) {
      getUserDetails();
    }
    // eslint-disable-next-line
  },[])
  
  function handleClick() {
    localStorage.clear('token');
    setUser({
      name: {
          first: "",
          last: ""
      },
      email: ""
    });
    navigate('/');
  }

  function authenticate() {
    if(!localStorage.getItem('token')) {
      ref.current.click();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand dark-color-text" to="/">
          <img src={delivLogo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
          Deliv
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-lg-flex collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link dark-color-text" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={localStorage.getItem('token')?"/cart":""} onClick={authenticate}>
                <i className="fa-solid fa-cart-shopping fa-xl dark-color-text"></i>
              </Link>
            </li>
          </ul>
          <div className="row ms-lg-2 flex-grow-1" id="navbar-row">
            <form className="d-flex col-lg-8" role="search">
                <input className="form-control dark-border" type="search" placeholder="Type Something to Search ..." aria-label="Search" />
                <button className="btn dark-color-text ms-2" type="submit">
                  Search
                </button>
            </form>
            <div className="d-lg-flex col-lg-4">
              <div className="mx-auto mt-2">
                <span className="navbar-text text-capitalize dark-color-text-unhover">
                  <i className={"fa-solid fa-user fa-xl me-2 " + (localStorage.getItem('token')?"dark-color-text-unhover":"d-none")}></i>
                  {user.name.first ? `${user.name.first} ${user.name.last}`:""}
                </span>
              </div>
              <div className="ms-auto">
                <Signin getUserDetails={getUserDetails}/>
                {
                  !localStorage.getItem('token')?
                  <form className="d-grid gap-2 d-lg-block d-lg-flex justify-content-lg-end mt-3 mt-lg-0"> 
                    <div className="btn dark-color-text dark-border" role="button" ref={ref} data-bs-target="#signInToggle" data-bs-toggle="modal">Signin / Signup</div>
                  </form> :
                  <form className="d-grid gap-2 d-lg-block d-lg-flex justify-content-lg-end mt-3 mt-lg-0"> 
                    <div className="btn dark-color-text dark-border" role="button" onClick={handleClick}>Logout</div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
