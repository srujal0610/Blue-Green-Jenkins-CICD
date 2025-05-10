import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import "./diamond.css"
import { nanoid } from 'nanoid'
function Diamond() {
  const { tableNo } = useParams();
  const [tableWorkers, setTableWorkers] = useState([]);
  const [addDiamond, setAddDiamond] = useState({
    userName:"",
    diamond:Number,
    diamondColor:""
  });

  const handleChange = (e) => {
    const {name, value} = e.target 
    setAddDiamond({
      ...addDiamond,
      [name]: value
    })
  } 

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8001/api/v1/diamond/addDiamond", addDiamond)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(tableNo);


  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`http://localhost:8001/api/v1/manager/alldata`);
        const allData = response.data.allData
        const tableWorkersData = allData.filter(worker => worker.tableNo === parseInt(tableNo));
        setTableWorkers(tableWorkersData);
        console.log(tableWorkers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  },[tableNo])

  const groupedWorkers = {}

  tableWorkers.forEach(worker => {
    if (worker.post === 'worker') {
        if (!groupedWorkers[worker.tableNo]) {
            groupedWorkers[worker.tableNo] = [];
        }
        groupedWorkers[worker.tableNo].push(worker);
    }
  });

  return (
    <div className='container diamond-tables-div'>
      {Object.keys(groupedWorkers).map(tableNo => (
        <div key={tableNo} className='diamond-table-section shadow-sm p-3 mb-3 bg-white rounded'>
          <div className='btn btn-primary'>T: {tableNo}</div>
          {groupedWorkers[tableNo].map((worker, index) => (
                        <div key={nanoid()} className=''>
                            <div className= {`diamond-table-section-name ${worker.status === 'yes' ? 'btn btn-outline-success' : 'btn btn-outline-danger'}`}>{worker.fullName}<span style={{marginLeft:"15px"}}>{worker.diamond}</span></div>

                        </div>
          ))}
          <form onSubmit={handleSubmit} className='diamond-submit-form'>
            <select className="form-select" aria-label="Default select example" value={addDiamond.userName} onChange={handleChange} name='userName'>
              <option value="">Select Worker</option>
              {groupedWorkers[tableNo].map((worker, index) => (
                <option key={nanoid()} value={worker.userName}>{worker.fullName}</option>
              ))}
            </select>
            <div className="form-group">
              <input 
                type="number" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder='Enter Diamonds'
                value={addDiamond.diamond}
                name='diamond'
                onChange={handleChange}
              />
            </div>
            <select
              className='form-select'
              aria-label="Default select example"
              value={addDiamond.diamondColor}
              onChange={handleChange}
              name='diamondColor'
            >
              <option value="white">WHITE</option>
              <option value="danger">RED</option>
              <option value="primary">BLUE</option>
              <option value="success">GREEN</option>
            </select>
            <div className='diamond-section-buttons'>
              <button type='submit' className='btn btn-primary'>Submit</button>
              <Link to="/manager" className='btn btn-danger'>Back</Link>
            </div>
          </form>
        </div>
      ))}
    </div>
  )
}

export default Diamond

