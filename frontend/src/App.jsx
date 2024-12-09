import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../src/components/shared/Layout.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App;

