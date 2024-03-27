import React from "react";
import "tailwindcss/tailwind.css";
import Signup from "./components/auth/Signup";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <>
      <Router> 
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<HomePage/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
