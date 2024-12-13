import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../src/components/shared/Layout.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import MyDevices from '../src/pages/myDevices.jsx';
import Chat from '../src/pages/Chat.jsx';
import About from '../src/pages/About.jsx';
import Report from '../src/pages/Report.jsx';


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
            <Route path='/chat' element={<Layout />}>
                <Route index element={<Chat />} />
            </Route>
            <Route path='/about' element={<Layout />}>
                <Route index element={<About />} />
            </Route>
            <Route path='/report' element={<Layout />}>
                <Route index element={<Report />} />
            </Route>

          </Routes>
      </Router>
  )
}

export default App;

