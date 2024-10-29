import { useState } from 'react'
import './App.css'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateEmp from './UpdateEmp'
import AddEmp from './AddEmp'
import Singleemp from './Singleemp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/singleemp/:id" element={<Singleemp />} />
          <Route path='/updateemp/:id' element={<UpdateEmp />} />
          <Route path='/addemployee' element={<AddEmp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
