import React, { useEffect, useState } from 'react'
import {Nav} from './index.js'
import Data from './Data.jsx'
import axios, { all } from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';
import "./data.css"
import { useSelector } from 'react-redux';

function AddWorker() {

    const user = useSelector(state => state.user.user)

    const [allData, setAllData] = useState([]);

    useEffect(() =>{
        const fetchData = async() =>{
            try {
                const response = await axios.get('http://localhost:8001/api/v1/manager/alldata');
                setAllData(response.data.allData.sort((a,b) => a.tableNo - b.tableNo))
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }

        fetchData()
    },[])

    const workerData = allData.filter(item => item.post == "worker")

    const dataElement = workerData.map((item, index) => <Data 
                                                        key={index} 
                                                        srNo={index + 1} 
                                                        fullName={item.fullName} 
                                                        userName={item.userName} 
                                                        tableNo={item.tableNo}
                                                        email={item.email}
                                                    />)

  return (
    <>
        <Nav value2={`active`} userName={user}/>
        <div className='container' id='workersData'>
            <div className='data shadow-sm p-3 mb-3 bg-white rounded'>
                <div className='worker-data-h-s'>srNo</div>
                <div className='worker-data-h-f'>fullName</div>
                <div className="worker-data-h-u">userName</div>
                <div className='worker-data-h-t'>tableNo</div>
                <div className="worker-data-h-e">email</div>
            </div>
            {dataElement}
            <Link type="button" className="btn btn-success addWorker" to="/register">Add Worker</Link>
        </div>
    </>
  )
}

export default AddWorker