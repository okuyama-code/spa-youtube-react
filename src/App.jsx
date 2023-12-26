import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import { NavBar } from './components/NavBar'
import { AppRoutes } from './components/AppRoutes'

function App() {


  return (
    <Router>
      <div className='app'>
        <h1>React × Rails(API)</h1>
        <p>FInd this application layout in client/src/App.jsx</p>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
