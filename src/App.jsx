import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar} from './Components/index.js'


function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
