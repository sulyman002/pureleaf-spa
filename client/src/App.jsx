import React from 'react'
import Register from './pages/Register'
import { Router, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Register />
      <Router>
        <Route path='/' element={<Register />}  />
      </Router>
      
    </div>
  )
}

export default App