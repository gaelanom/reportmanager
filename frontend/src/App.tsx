import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Employees from "./Components/Employees/Employees";
import CaseStudies from "./Components/CaseStudies/CaseStudies";
import Navbar from "./Components/Navbar/Navbar";
import Departments from "./Components/Departments/Departments";
import DepartmentHomePageTemplate from "./Components/Departments/DepartmentHomePageTemplate";
import DataInput from "./Components/Departments/DataInput";
import Messages from "./Components/Messages/Messages";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import DepartmentReports from "./Components/Departments/DepartmentReports";
import DataVisualization from "./Components/dataVisualization/dataVisualization";
import Api from "./API/Api";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/treemap";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/graphic";
import "echarts/lib/component/dataZoom";

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

            <Route path="/departments/:departmentID/employees">
              <Employees />
            </Route>

            <Route path="/departments/:departmentID/case-studies" component={CaseStudies} />

            <Route path="/departments/:departmentID/datainput" component={DataInput} />

            {/* temp export page */}
            <Route path="/departments/:departmentID/departmentReports" component={DepartmentReports} />
              
            <Route exact path="/departments">
              <Departments />
            </Route>

            <Route exact path="/departments/:departmentID" component={DepartmentHomePageTemplate} />

            <Route path="/messages" component={Messages} />

            <Route path="/leaderboard" component={Leaderboard} />

            <Route path="/visualization/:id" component={DataVisualization} />

          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
