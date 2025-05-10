import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import Table from './Table.jsx';
import { nanoid } from 'nanoid'
import "./table.css"
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min.js';


function Main() {

    const [allData, setAllData] = useState([]);

    const history = useHistory()
    const [totalActiveWorkers, setTotalActiveWorkers] = useState(0);
    const [totalInactiveWorkers, setTotalInactiveWorkers] = useState(0);
    const [totalDiamonds, setTotalDiamonds] = useState(0); 

    

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:8001/api/v1/manager/alldata');
                setAllData(response.data.allData)

                const total = response.data.allData.reduce((count, worker) => {
                  if (worker.post === 'worker' && worker.status === 'yes') {
                      return count + 1;
                  }
                  return count;
              }, 0);
              setTotalActiveWorkers(total);

              const totalInactive = response.data.allData.reduce((count, worker) => {
                if (worker.post === 'worker' && worker.status === 'no') {
                    return count + 1;
                }
                return count;
            }, 0);
            setTotalInactiveWorkers(totalInactive);

            const totalDiamondsSum = response.data.allData.reduce((sum, worker) => {
              if (worker.post === 'worker') {
                  return sum + worker.diamond;
              }
              return sum;
            }, 0);
            setTotalDiamonds(totalDiamondsSum);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    })

    
    
    const groupedWorkers = {}
    
    allData.forEach(worker => {
        if (worker.post === 'worker') {
            if (!groupedWorkers[worker.tableNo]) {
                groupedWorkers[worker.tableNo] = [];
            }
            groupedWorkers[worker.tableNo].push(worker);
        }
    });
    
    const handleTableClick = (tableNo) => {
        history.push(`/table/${tableNo}`);
    };

  return (
    <>
      <div className='container shadow-sm p-3 mt-4 bg-white rounded' style={{width:"750px", fontSize:"17px", fontWeight:"600", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div className='btn btn-success'style={{width:'29%'}}>Active Worker's : {totalActiveWorkers}</div>
        <div className='btn btn-danger' style={{width:'29%'}}>Inactive Worker's : {totalInactiveWorkers}</div>
        <div className='btn btn-success'style={{width:'29%'}}>Processing Diamonds: {totalDiamonds}</div>
      </div>
      <div className='container tables-div'>
      {Object.keys(groupedWorkers).map(tableNo => (
        <div key={tableNo} className='table-section shadow-sm p-3 mb-3 bg-white rounded'>
          <div className='btn btn-primary' onClick={() => handleTableClick(tableNo)}>T: {tableNo}</div>
          {groupedWorkers[tableNo].map((worker, index) => (
                        <div key={nanoid()} className='status-section'>
                            <div className="status-box" style={{ width: '10px', height: '10px',marginRight:'15px',borderRadius:'10px', backgroundColor: worker.status === 'yes' ? 'green' : 'red' }}></div>
                            <div style={{fontSize:"16.5px"}}>{worker.fullName}</div>
                            <div style={{marginLeft:"10px"}} className={`btn btn-outline-${worker.diamondColor}`}>{worker.diamond}</div>
                        </div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

export default withRouter(Main)