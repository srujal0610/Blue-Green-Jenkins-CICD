import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { actionCreators } from "../state/index.js";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Building2 } from 'lucide-react';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({
        userName: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post("http://localhost:8000/api/v1/users/login", user);
            
    //         const { userName, role } = response.data.data.user; // Extract role from response
            
    //         dispatch(actionCreators.loginUser(userName));
    //         sessionStorage.setItem('isAuthenticated', 'true');
    //         sessionStorage.setItem('user', JSON.stringify(userName));
    //         sessionStorage.setItem('role', role); // Store role in sessionStorage

    //         history.push("/")
    //     } catch (error) {
    //         console.log("Invalid username or password", error);
    //         setError("Invalid username or password");
    //     }
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8001/api/v1/users/login", user);
            
            console.log("Full API Response:", response.data);
            console.log("Response Data:", response.data.data);
            console.log("User Object:", response.data.data.user);
    
            if (!response.data || !response.data.data || !response.data.data.user) {
                throw new Error("Invalid response format from backend");
            }
    
            const { userName, post } = response.data.data.user || {}; // 'post' contains the role
            console.log("Extracted Role:", post);
    
            if (!post) {
                throw new Error("Role is missing in API response");
            }
    
            dispatch(actionCreators.loginUser(userName));
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(userName));
            sessionStorage.setItem('role', post); // Store 'post' instead of 'role'
    
            history.push("/");
        } catch (error) {
            console.log("Login Error:", error);
            setError("Invalid username or password");
        }
    };
    
    
    
        
    return (
        <div className='login-container'>
            <form className='login-box' onSubmit={handleSubmit}>
                {/* Logo with Proper Spacing */}
                <div className="logo-header">
                    <Building2 className="logo-icon" />
                    <span className="logo-text">DiamondLabor</span>
                </div>

                <h1 className='login-title'>Welcome to DiamondLabor</h1>

                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control input-dark"
                        id="userName"
                        name='userName'
                        value={user.userName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control input-dark"
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>

                {error && <p className='error-text'>{error}</p>}

                <div className="button-container">
                    <button type="submit" className="btn btn-primary btn-dark">Login</button>
                    <Link to="/register" className="btn btn-secondary btn-dark">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Login);














































































































// import React, { useState } from 'react';
// import axios from 'axios';
// import "./login.css";
// import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import { useDispatch } from 'react-redux';
// import { actionCreators } from "../state/index.js";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { Building2 } from 'lucide-react';

// function Login() {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [user, setUser] = useState({
//         userName: "",
//         password: ""
//     });

//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8000/api/v1/users/login", user);
//             dispatch(actionCreators.loginUser(response.data.data.user.userName));
//             sessionStorage.setItem('isAuthenticated', 'true');
//             sessionStorage.setItem('user', JSON.stringify(response.data.data.user.userName));
//             history.push("/")
//         } catch (error) {
//             console.log("Invalid username or password", error);
//             setError("Invalid username or password");
//         }
//     };

//     return (
//         <div className='login-container'>
//             <form className='login-box' onSubmit={handleSubmit}>
//                 {/* Logo with Proper Spacing */}
//                 <div className="logo-header">
//                     <Building2 className="logo-icon" />
//                     <span className="logo-text">DiamondLabor</span>
//                 </div>

//                 <h1 className='login-title'>Welcome to DiamondLabor</h1>

//                 <div className="mb-3">
//                     <label htmlFor="userName" className="form-label">Username</label>
//                     <input
//                         type="text"
//                         className="form-control input-dark"
//                         id="userName"
//                         name='userName'
//                         value={user.userName}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="form-control input-dark"
//                         name='password'
//                         value={user.password}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {error && <p className='error-text'>{error}</p>}

//                 <div className="button-container">
//                     <button type="submit" className="btn btn-primary btn-dark">Login</button>
//                     <Link to="/register" className="btn btn-secondary btn-dark">Register</Link>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default withRouter(Login);



















































// import React, { useState } from 'react';
// import axios from 'axios';
// import "./login.css";
// import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import { useDispatch } from 'react-redux';
// import { actionCreators } from "../state/index.js";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { Building2, Phone, Mail, Users, Briefcase, Star, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


// function Login() {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [user, setUser] = useState({
//         userName: "",
//         password: ""
//     });

//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8000/api/v1/users/login", user);
//             dispatch(actionCreators.loginUser(response.data.data.user.userName));
//             sessionStorage.setItem('isAuthenticated', 'true');
//             sessionStorage.setItem('user', JSON.stringify(response.data.data.user.userName));
//             history.push("/");
//         } catch (error) {
//             console.log("Invalid username or password", error);
//             setError("Invalid username or password");
//         }
//     };

//     return (
//         <>
//         <div className="flex items-center">
//           <Building2 className="h-8 w-8 text-sky-400" />
//           <span className="ml-2 text-xl font-bold">DiamondLabor</span>
//         </div>

//         <div className='login-container'>
            
//             <form className='login-box' onSubmit={handleSubmit}>
//                 <h1 className='login-title'>Welcome to DiamondLabor</h1>
//                 <div className="mb-3">
//                     <label htmlFor="userName" className="form-label">Username</label>
//                     <input
//                         type="text"
//                         className="form-control input-dark"
//                         id="userName"
//                         name='userName'
//                         value={user.userName}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className="form-control input-dark"
//                         name='password'
//                         value={user.password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 {error && <p className='error-text'>{error}</p>}
//                 <div className="button-container">
//                     <button type="submit" className="btn btn-primary btn-dark">Login</button>
//                     <Link to="/register" className="btn btn-secondary btn-dark">Register</Link>
//                 </div>
//             </form>
//         </div>
//         </>
//     );
// }

// export default withRouter(Login);










































// import React, { useState } from 'react'
// import axios from 'axios'
// import "./login.css"
// import { useHistory, withRouter, } from 'react-router-dom/cjs/react-router-dom.min'
// import { bindActionCreators } from 'redux'
// import {actionCreators} from "../state/index.js"
// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom/cjs/react-router-dom.min'

// function Login() {

//     const dispatch = useDispatch()

//     const history = useHistory()

//     const [user, setUser] = useState({
//         userName: "",
//         password: ""
//     })

//     const [error, setError] = useState("")

//     const handleChange = (e) =>{
//         const {post, name, value} = e.target
//         setUser({
//             ...user,
//             [name]: value
//         })
//     }

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post("http://localhost:8000/api/v1/users/login", user)
//             console.log(response.data.data.user.userName);
//             dispatch(actionCreators.loginUser(response.data.data.user.userName))
//             sessionStorage.setItem('isAuthenticated', 'true');
//             sessionStorage.setItem('user', JSON.stringify(response.data.data.user.userName));
//             console.log(response.data.data.user.post);
//             const post = response.data.data.user.post
//             if(post=="manager"){
//                 // history.push(`/manager`)
//                 history.push("/")
//             }else{
//                 // history.push("/worker")
//                 history.push("/")
//             }
//         } catch (error) {
//             console.log("Invalide username or password",error);
//             setError("Invalid username or password")
//         }
//     }

//   return (
//     <form className='login-container' onSubmit={handleSubmit}>

//         <h1>Welcome To DLMS System</h1>

//         {/* <div class="mb-3">
//             <label htmlFor="post" class="form-label">Post</label>
//             <select 
//                 id="post" 
//                 className="form-select"
//                 name='post'
//                 value={user.post}
//                 onChange={handleChange}
//             >
//                 <option value="">select</option>
//                 <option value="worker" >Worker</option>
//                 <option value="manager">Manager</option>
//             </select>
//         </div> */}
//         <div className="mb-3">
//             <label htmlFor="userName" className="form-label">Username</label>
//             <input
//                 type="text" 
//                 className="form-control" 
//                 id="userName" 
//                 name='userName'
//                 value={user.userName}
//                 onChange={handleChange}
//             />
//         </div>
//         <div className="mb-3">
//             <label htmlFor="password" class="form-label">Password</label>
//             <input 
//                 type="password" 
//                 id="password" 
//                 className="form-control" 
//                 name='password'
//                 aria-describedby="passwordHelpBlock"
//                 value={user.password}
//                 onChange={handleChange}
//             />
//         </div>
//         {error && <p style={{color:'red'}}>{error}</p>}
//         <div className="button-container">
//         <button type="submit" className="btn btn-primary">Login</button>
//         <Link to="/register" type="button" class="btn btn-danger back-button">Register</Link>
//         </div>
       
//     </form>
//   )
// }

// export default withRouter(Login)









































