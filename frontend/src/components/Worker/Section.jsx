import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Section({ fullName, tableNo, email, status, userName, diamond, diamondColor}) {
  const [check, setCheck] = useState({
    userName: userName,
    status: status === 'yes'
  });

  const user = userName

  const [deleteDiamond, setDeleteDiamond] = useState({
    userName: user
  })

  const handleSubmit = async () => {
    try {
      const postData = {
        userName: check.userName,
        status: check.status ? "yes" : "no"
      };
      await axios.post("http://localhost:8000/api/v1/worker/status", postData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDiamond = async() => {
    try {
      await axios.post("http://localhost:8001/api/v1/diamond/deleteDiamond", deleteDiamond);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [check]);

  const handleChange = (e) => {
    const { checked } = e.target;
    setCheck(prevCheck => ({
      ...prevCheck,
      status: checked
    }));
  };

  return (
    <div className='worker-section-table shadow-sm p-3 mb-3 bg-white rounded'>
      <div className='worker-section-table-header'>
        <div className="btn btn-primary">Table No : {tableNo}</div>
        <form>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              id="status" 
              checked={check.status}
              onChange={handleChange} 
              name='status' 
            />
            <label className="form-check-label" htmlFor="status"><span style={{fontWeight: "600"}}>Active</span></label>
          </div>
        </form>
      </div>
      <div className='worker-section-table-data'>
        <div className='worker-section-table-name'>{fullName}</div>
        <div className='worker-section-table-email'>{email}</div>
      </div>
      <div style={{fontWeight:"600", fontSize:"17px"}} className='btn btn-outline-danger'>Diamond For Work : <span className='btn btn-danger' style={{fontWeight:"600", fontSize:"17px"}}>{diamond}</span></div>
      <div style={{display:"flex", alignItems:"center", width:"170px",justifyContent:"space-between", fontSize:"17px", fontWeight:"600", margin:"10px 0"}}>
        Diamond Color
        <div className={`btn btn-${diamondColor}`}><i class="fa fa-diamond"></i></div>
      </div>
      <button type='button' className='btn btn-primary' style={{margin:"20px"}} onClick={handleDeleteDiamond}>Done</button>
    </div>
  );
}

export default Section;
