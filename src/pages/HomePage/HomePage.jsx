import React from 'react'
import {Link} from 'react-router-dom'
const HomePage = () => {
  return (
    <div className='HomePage'>
      <h1>Welcome To HomePage</h1>
        <button><Link to='/login'>Login</Link></button>
    </div>
  )
}

export default HomePage
