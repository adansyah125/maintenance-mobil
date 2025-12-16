import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>
        <Link to="/dashboard">Login</Link>
      </h1>
    </div>
  )
}

export default Login
