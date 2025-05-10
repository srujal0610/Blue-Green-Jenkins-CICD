import React from 'react'
import "./table.css"

function Table({status, tableNo, worker1, worker2}) {
  return (
    <div className='table-section'>
        <div>{tableNo}</div>
        <div>{status}</div>
        <div>{worker1}</div>
        <div>{worker2}</div>
    </div>
  )
}

export default Table