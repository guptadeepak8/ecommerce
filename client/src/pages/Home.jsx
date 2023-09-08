import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router-dom'
const Home = () => {

  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default Home