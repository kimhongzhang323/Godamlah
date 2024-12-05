import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'; // Import the Layout component


function App() {
 return (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />} />
        <Route index element={<Dashboard />} />
    </Routes>
  </Router>
 )
}

export default App;
