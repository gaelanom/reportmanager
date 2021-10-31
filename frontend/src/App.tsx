import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Employees from "./Components/Employees/Employees";
import Navbar from "./Components/Navbar/Navbar";
import Departments from "./Components/Departments/Departments";
import DataInput from "./Components/Departments/DataInput";
import Messages from "./Components/Messages/Messages";
import Leaderboard from "./Components/Leaderboard/Leaderboard";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

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

            <Route exact path="/departments">
              <Departments />
            </Route>

            <Route path="/nicu-paed-data-input">
              <DataInput department={"NICU-paed"} />
            </Route>

            <Route path="/communityhealth-data-input">
              <DataInput department={"CommunityHealth"} />
            </Route>

            <Route path="/messages">
              <Messages />
            </Route>

            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
