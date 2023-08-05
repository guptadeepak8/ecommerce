import React from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectloggedInUser } from '../store/Auth/authSlice'

 


const Protected = ({children}) => {

  const user=useSelector(selectloggedInUser)

  return  user ? children : <Navigate to="/login" replace={true} />
}

export default Protected

