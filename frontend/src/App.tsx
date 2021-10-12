import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Employees from './Components/Employees/Employees'
import Navbar from './Components/Navbar/Navbar'
import Maternity from './Components/Departments/Maternity'
import Rehab from './Components/Departments/Rehab'
import NicuPaed from './Components/Departments/NicuPaed'
import CommunityHealth from './Components/Departments/CommunityHealth'
import DataInput from './Components/Departments/DataInput'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


function App() {
  return (
    <>

      <Router>

        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/employees">
            <Employees />
          </Route>

          <Route path="/maternity-data-input">
            <DataInput department={"Maternity"} />
          </Route>

          <Route path="/maternity">
            <Maternity />
          </Route>

          <Route path="/rehab-data-input">
            <DataInput department={"Rehab"} />
          </Route>

          <Route path="/rehab">
            <Rehab />
          </Route>

          <Route path="/nicu-paed-data-input">
            <DataInput department={"NICU-paed"} />
          </Route>

          <Route path="/nicu-paed">
            <NicuPaed />
          </Route>

          <Route path="/communityhealth-data-input">
            <DataInput department={"CommunityHealth"} />
          </Route>

          <Route path="/communityhealth">
            <CommunityHealth />
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
