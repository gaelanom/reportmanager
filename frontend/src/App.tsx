import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Employees from "./Components/Employees/Employees";
import Navbar from "./Components/Navbar/Navbar";
import Departments from "./Components/Departments/Departments";
import DepartmentHomePageTemplate from "./Components/Departments/DepartmentHomePageTemplate";
import DataInput from "./Components/Departments/DataInput";
import Messages from "./Components/Messages/Messages";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Api from "./API/Api";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

type DepartmentType = {
    id: number,
    name: string,
    blurb: string
}

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: false,
    };


  }

  private handleLoggedIn = () => {
    this.setState({ loggedIn: true });
  };


  render() {

    return (
      <>
        <Router>
          {this.state.loggedIn ? <Navbar /> : <Redirect to="/login" />}
          
          
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login onLoggedIn={this.handleLoggedIn} />
            </Route>

            <Route path="/employees">
              <Employees />
            </Route>

            <Route path="/maternity-data-input">
              <DataInput department={"Maternity"} />
            </Route>

            <Route path="/rehab-data-input">
              <DataInput department={"Rehab"} />
            </Route>

            <Route path="/nicu-paed-data-input">
              <DataInput department={"NICU-paed"} />
            </Route>

            <Route path="/communityhealth-data-input">
              <DataInput department={"CommunityHealth"} />
            </Route>

            <Route exact path="/departments">
              <Departments />
            </Route>

            <Route exact path="/departments/:departmentID">
              <DepartmentHomePageTemplate />
            </Route>

            {/* I did't touch the following 2 components */}
            <Route path="/departments/:departmentID/messages">
              <Messages />
            </Route>

            <Route path="/departments/:departmentID/leaderboard">
              <Leaderboard />
            </Route>
            
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
