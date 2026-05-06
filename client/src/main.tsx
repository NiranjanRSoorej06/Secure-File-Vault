import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element ={<App/>}/>
        
        {/* Login */}
        <Route path="/login" element={<Login/>}/>

        {/* Register */}
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)