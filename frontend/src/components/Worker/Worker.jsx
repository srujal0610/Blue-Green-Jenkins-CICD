import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Nav from './Nav.jsx';
import Section from './Section.jsx';
import axios from 'axios';
import "./worker.css"

function Worker() {
  const user = useSelector(state => state.user.user);
  const [userData, setUserData] = useState({ userName: user });
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("http://localhost:8001/api/v1/worker/getworkerdata", userData);
        setData(response.data.data);
        setShowPopup(true)
      } catch (err) {
        console.log(err);
      }
    }
    
    fetchUserData();
  }, [userData]);
  
  return (
    <div>
      <Nav userName={user}/>
      {data ? (
        <Section 
          key={data._id} 
          fullName={data.fullName} 
          tableNo={data.tableNo} 
          email={data.email} 
          status={data.status} 
          userName={data.userName}
          diamond={data.diamond}
          diamondColor={data.diamondColor}
        />
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>  
  );
}

export default Worker;






// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import Section from './Section.jsx'; 
// import axios from 'axios';
// import "./worker.css";

// function Worker() {
//   const user = useSelector(state => state.user.user);
//   const [userData, setUserData] = useState({ userName: user });
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post("http://localhost:8000/api/v1/worker/getworkerdata", userData);
//         setData(response.data.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
    
//     fetchUserData();
//   }, [userData]);
  
//   return (
//     <div className="worker-container">
//       {data ? (
//         <div className="worker-card">
//           <div className="worker-header">
//             <span className="badge">Table No: {data.tableNo}</span>
//             <label className="switch">
//               <input type="checkbox" checked={data.status === "Active"} readOnly />
//               <span className="slider round"></span>
//             </label>
//           </div>
          
//           <h2 className="worker-name">{data.fullName}</h2>
//           <p className="worker-email">{data.email}</p>

//           <div className="diamond-box">
//             💎 Diamond For Work: <span className="diamond-count">{data.diamond}</span>
//           </div>

//           <p className="diamond-color">
//             Diamond Color <span className="diamond-icon">💠</span>
//           </p>

//           <button className="done-btn">Done</button>
//         </div>
//       ) : (
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Worker;
