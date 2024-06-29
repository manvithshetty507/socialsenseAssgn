import React from 'react'
import '@/styles/other.css';


function OtherPage({ name }) {
  return (
    <div className='other_page'>
        <h1>
            User, you are at {name.charAt(0).toUpperCase() + name.substring(1)} Page 
        </h1>
    </div>
  )
}

export default OtherPage