import React from 'react'
import { useHistory } from 'react-router-dom';
import { authActions } from '../Store/authSlice';
import {useSelector,useDispatch} from 'react-redux'

function Logout() {

  const dispatch = useDispatch()

    let history = useHistory()
    localStorage.removeItem('email')
    localStorage.removeItem('token')
   
    dispatch(authActions.logout())


    history.replace('/login')
  return (
    <div>
      <h1>LOGOUT</h1>
    </div>
  )
}

export default Logout
