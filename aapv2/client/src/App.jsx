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
import CreateProfile from './views/Shelter/CreateProfile'
import Profile from "./views/Shelter/Profile"
import ProView from "./views/Preview/ProfileView"
import UserHome from "./views/User/BrowseHome"
import GlobalStyle from './globalStyles';
// import HL from "./components/HomeLogo"
import FLpreview from "./views/User/UFview"
import SLpreview from "./views/User/SFview"
import ShelterPreview from "./views/Preview/ShelterView"
import U2U from "./views/Preview/User2UserView"

function App() {
  return (
    <>
    <GlobalStyle/>
      {/* <HL/> */}
    <Router>
      <UserLogReg path="/"/>
      <Home path="/home"/>
      <UserHome path="UFBHome"/>
      <ShelterLogReg path="/shelter"/>
      <Dashboard path="/dashboard"/>
      <UEdit path="/UPEdit"/>
      <SPEdit path="/SPEdit/:id"/>
      <ProPic path="/upload"/>
      <SProPic path="/sUpload"/>
      <CreateProfile path="/createprofile"/>
      <Profile path="/pet/profile/:id"/>
      <ProView path="/profile/view/:id"/>
      <U2U path="/user/view/:id"/>
      <FLpreview path="/pet/follow/list"/>
      <SLpreview path="/shelter/follow/list"/>
      <ShelterPreview path="/shelter/view/:id"/>

    </Router>
    </>
  );
}

export default App;
