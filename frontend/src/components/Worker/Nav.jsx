import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios  from 'axios'

function Nav(props) {

    const logout = async() => {
        try{
            // axios.post("http://localhost:8000/api/v1/users/logout")
            axios.post("http://localhost:8001/api/v1/users/logout")
        }catch(err){
            console.log(err);
        }
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
            <div className="navbar-brand" >DLMS</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                    <li className="nav-item">
                        {/* <Link className={`nav-link ${props.value1}`} aria-current="page" to="/manager">Home</Link> */}
                    </li>
                    <li className="nav-item">
                        {/* <Link className={`nav-link ${props.value2}`} to="/addWorker">Worker</Link> */}
                    </li>
                </ul>
                <button className="btn btn-success" style={{ marginRight: "20px" }}>{props.userName}</button>
                <form className="d-flex" role="search">
                    <Link className="btn btn-outline-danger" type="submit" to="/">Logout</Link>
                </form>
            </div>
        </div>
    </nav>
  )
}

export default Nav