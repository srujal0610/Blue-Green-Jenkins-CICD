// import './App.css';
// import Diamond from './components/Diamond/Diamond.jsx';
// import { Login, Register, Manager, AddWorker} from "./components/index.js";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Worker from './components/Worker/Worker.jsx';
// import Home from './components/home.jsx';

// function App() {
//   return (
//     <>
//       <Router>
//         <Switch>
//         <Route exact path="/">
//             <Home/>
//           </Route>
//           <Route exact path="/login">
//             <Login/>
//           </Route>
//           <Route path ="/register">
//             <Register/>
//           </Route>
//           <Route path ="/manager">
//             <Manager/>
//           </Route>
//           <Route path = "/addWorker">
//                 <AddWorker/>
//           </Route>
//           <Route path = "/table/:tableNo">
//                 <Diamond/>
//           </Route>
//           <Route path="/worker">
//                 <Worker/>
//           </Route>
//         </Switch>
//       </Router>
//     </>
//   );
// }


// export default App



import './App.css';
import Diamond from './components/Diamond/Diamond.jsx';
import { Login, Register, Manager, AddWorker } from "./components/index.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Worker from './components/Worker/Worker.jsx';
import Home from './components/home.jsx';

function App() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const role = sessionStorage.getItem("role"); // Get role from sessionStorage

  return (
    <>
      <Router>
        <Switch>
          {/* If user is worker, redirect them away from Home */}
          <Route exact path="/">
            {role === "worker" ? <Redirect to="/worker" /> : <Home />}
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/manager">
            <Manager />
          </Route>

          <Route path="/addWorker">
            <AddWorker />
          </Route>

          <Route path="/table/:tableNo">
            <Diamond />
          </Route>

          {/* If user is manager, prevent access to Worker page */}
          <Route path="/worker">
            {role === "manager" ? <Redirect to="/" /> : <Worker />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
