import React from 'react'
import { useHistory } from 'react-router-dom';

function Logout() {

    let history = useHistory()
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    history.replace('/login')

  return (
    <div>
      <h1>LOGOUT</h1>
    </div>
  )
}

export default Logout
