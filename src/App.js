import React from "react";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import HomeScreen from "./components/screens/HomeScreen";
import PartnerRegistrationScreen from "./components/screens/PartnerRegistrationScreen";
import LoginScreen from "./components/screens/LoginScreen";

import GFTNavbar from "./components/Navbar";

export default function App() {


  return (
    <Router>
        <GFTNavbar />
        <Routes>
            <Route exact path="/" element={<HomeScreen/>}></Route>
            <Route exact path="/register/" element={<PartnerRegistrationScreen/>}></Route>
            <Route exact path="/login/" element={<LoginScreen/>}></Route>
        </Routes>
    </Router>
  );
}