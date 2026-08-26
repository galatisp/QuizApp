import { useState } from 'react'
import React, { BrowserRouter as Router, Routes, Route, Link,
    useNavigate,
    Outlet, } from 'react-router-dom';

import Questions from './Questions';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (


    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Questions />} />


      </Routes>
    </Router>





  )
}

export default App
