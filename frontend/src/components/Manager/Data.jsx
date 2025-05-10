import React, { useState } from 'react'
import "./data.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'

function Data({srNo, fullName, userName, tableNo, email}) {

  const user = userName

  const [deleteUser, setDeleteUser] = useState({
    "userName":user
  })

  const handelDelete = async() => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if(confirmDelete){
      try {
        await axios.post("http://localhost:8001/api/v1/users/deleteUser",deleteUser)
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='container' id='workersData'>
        <div className='data shadow-lg p-3 mb-3 bg-white rounded'>
            <div className='worker-data-s'>{srNo}</div>
            <div className='worker-data-f'>{fullName}</div>
            <div className="worker-data-u">{userName}</div>
            <div className='worker-data-t'>{tableNo}</div>
            <div className="worker-data-e">{email}</div>
            <div className='btn btn-outline-danger' onClick={handelDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </div>
        </div>
    </div>
  )
}

export default Data