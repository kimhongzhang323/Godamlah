// import React, { useState } from "react";
// import axios from "axios";
// import HCaptcha from "@hcaptcha/react-hcaptcha";

// const App = () => {
//   const [formData, setFormData] = useState({ username: "", password: "", captcha_response: "" });
//   const [captchaToken, setCaptchaToken] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCaptcha = (token) => {
//     setCaptchaToken(token);
//     setFormData({ ...formData, captcha_response: token });
//   };

//   const handleSubmit = async (endpoint) => {
//     if (!captchaToken) {
//       setMessage("Please complete the captcha.");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);
//       setMessage(response.data.message || "Success!");
//     } catch (error) {
//       console.error("Error details:", error);
//       setMessage(error.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>User Authentication</h1>

//       {/* Registration Form */}
//       <div>
//         <h2>Register</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleInputChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleInputChange}
//         />
//         <HCaptcha
//           sitekey="496c1d9a-7714-4c70-82be-8cc666046cd0"
//           onVerify={handleCaptcha}
//         />
//         <button onClick={() => handleSubmit("register")}>Register</button>
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from 'frontend/src/components/shared/Layout.jsx';
import Dashboard from 'frontend/src/pages/Dashboard.jsx';


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

