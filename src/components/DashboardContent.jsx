import React from 'react'
import { Link } from 'react-router-dom'


function DashboardContent() {
  return (
    <div>
      
      <h1 className='text-3xl font-bold underline'>
        <Link to="/">Dashboard</Link>
      </h1>
    </div>
  )
}

export default DashboardContent
