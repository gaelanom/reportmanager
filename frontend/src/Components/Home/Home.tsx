import React from "react";
import CaseStudy from "../../Images/CaseStudy.jpg";
import DataImage from "../../Images/Data.jpg";
import Employees from "../../Images/Employees.jpg";
import BioMechanical from "../../Images/BioMechanical.jpg";
import Points from "../../Images/Points.jpg";
import { Link } from "react-router-dom";
import Api from "../../API/Api";
import { render } from "@testing-library/react";
import Departments from "../Departments/Departments";

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { departments: [] };
  }

  componentDidMount() {
    Api.Departments.getDepartments().then((data) => {
      this.setState({ departments: data });
      console.log(this.state.departments);
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="display-1 text-center mt-4"> Admin Portal</h1>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {this.state.departments == null ? (
              <React.Fragment />
            ) : (
              this.state.departments.map((department: any) =>
                this.renderDepartment(
                  department.id,
                  department.name,
                  department.blurb == null ? "" : department.blurb
                )
              )
            )}
          </div>

          <div className="card text-center mt-4">
            <div className="card-header">Leaderboards</div>
            <div className="card-body">
              <h5 className="card-title">
                Click for more information on Leaderboards
              </h5>
              <h5 className="card-title">
                <Link to="/leaderboard">Leaderboards</Link>
              </h5>
            </div>
          </div>

          <div className="card text-center mt-4">
            <div className="card-header">MessageBoard</div>
            <div className="card-body">
              <h5 className="card-title">
                Click for more information on MessageBoard
              </h5>
              <h5 className="card-title">
                <Link to="/messages">MessageBoard</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDepartment(id: any, name: any, blurb: any) {
    var link = "/departments/" + id;
    return (
      <div className="col">
        <div className="card h-100">
          {/* <img src="..." className="card-img-top" alt="..."> */}
          <div className="card-body">
            <h5 className="card-title">
              <Link
                to={{
                  pathname: `/departments/${id}`,
                  state: {
                    name: name,
                    id: id,
                  },
                }}
              >
                {name}
              </Link>
            </h5>
            <p className="card-text">{blurb == "" ? "N/A" : blurb}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
