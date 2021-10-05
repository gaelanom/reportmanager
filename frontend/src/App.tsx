import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Employees from './Components/Employees/Employees'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
                <Router>
                    {/* <Navbar /> */}
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
                    </Switch>
                </Router>
            </>
  );
}

export default App;
