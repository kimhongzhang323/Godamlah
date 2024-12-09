import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../src/components/shared/Layout.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import MyDevices from '../src/pages/myDevices.jsx';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
              </Route>
              <Route path='/my-devices' element={<Layout />}>
                    <Route index element={<MyDevices />} />
                </Route>
          </Routes>
      </Router>
  )
}

export default App;

