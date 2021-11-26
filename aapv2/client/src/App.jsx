import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Router} from "@reach/router";
// import React, { Component }  from 'react';
import Home from "./views/User/Home";
import UEdit from "./views/User/Edit";
import UserLogReg from './views/User/UserLogReg';
import ShelterLogReg from "./views/Shelter/ShelterLogReg";
import Dashboard from "./views/Shelter/Dashboard";
import ProPic from "./views/User/UploadProPic";
import SPEdit from './views/Shelter/ShelterEdit';
import SProPic from "./views/Shelter/UploadShelterPic"
// import HL from "./components/HomeLogo"

function App() {
  return (
    <>
      {/* <HL/> */}
    <Router>
      <UserLogReg path="/"/>
      <Home path="/home"/>
      <ShelterLogReg path="/shelter"/>
      <Dashboard path="/dashboard"/>
      <UEdit path="/UPEdit"/>
      <SPEdit path="/SPEdit/:id"/>
      <ProPic path="/upload"/>
      <SProPic path="/sUpload"/>
    </Router>
    </>
  );
}

export default App;
