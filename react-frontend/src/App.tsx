import { useState } from 'react'
import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Questions from './questions/Questions';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        
      <Router>
        <Routes>
          <Route path="/" element={<Questions />} />
          

        </Routes>
      </Router>



    
    </>
  )
}

export default App
