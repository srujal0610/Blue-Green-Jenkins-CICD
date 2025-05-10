import React from 'react'
import "./register.css"
import axios from "axios"
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { withRouter } from 'react-router-dom';
import Nav from "../Manager/Nav.jsx"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Register() {

    const history = useHistory()

    const[error, setError] = useState("")

    const [user, setUser] = useState({
        userName:"",
        fullName:"",
        email:"",
        password:"",
        post:"",
        tableNo:""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name,value)
        setUser({
            ...user,
            [name]: value
        })
    }

    console.log(user);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8001/api/v1/users/register", user)
            // history.push(`/${user.post}dashboard`)
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.message);
            setError("All Fields are qequired")
        }
    }


  return (
    <>
    <Nav value2={`active`}/>
    <form className='register-container' onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="userName" className="form-label">Username</label>
            <input
                type="text" 
                className="form-control"
                name='userName' 
                id="userName" 
                value={user.userName}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label for="fullName" className="form-label">Fullname</label>
            <input
                type="text" 
                className="form-control" 
                name='fullName'
                id="fullName"
                value={user.fullName}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input
                type="email" 
                className="form-control" 
                name='email'
                id="email" 
                aria-describedby="emailHelp"
                value={user.email}
                onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                name='password'
                id="exampleInputPassword1"
                value={user.password}
                onChange={handleChange}
            />
        </div>
        <div class="mb-3">
            <label for="post" class="form-label">Post</label>
            <select 
                id="post" 
                class="form-select"
                name='post'
                value={user.post}
                onChange={handleChange}
            >
                <option value="">select</option>
                <option value="worker" >Worker</option>
                <option value="manager">Manager</option>
            </select>
        </div>
        <div className="mb-3">
            <label for="tableNo" className="form-label">TableNo</label>
            <input
                type="number" 
                className="form-control" 
                name='tableNo'
                id="tableNo" 
                value={user.tableNo}
                onChange={handleChange}
            />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <div className="buttons">
            <button type="submit" className="btn btn-primary submit-button" >Submit</button>
            <Link to="/addWorker" type="button" class="btn btn-danger back-button">Back</Link>
            <Link to="/login" type="button" class="btn btn-danger back-button">login</Link>
        </div>
    </form>
    </>
  )
}

export default withRouter(Register);