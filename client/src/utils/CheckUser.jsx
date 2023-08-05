import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectloggedInUser } from '../store/Auth/authSlice'

 


const CheckUser = ({children}) => {
  
  const user=useSelector(selectloggedInUser)
  return  user ? <Navigate to="/" replace={true} />:children;
}

export default CheckUser

