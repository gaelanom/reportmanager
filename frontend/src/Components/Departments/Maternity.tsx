import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CaseStudy from '../../Images/CaseStudy.jpg'
import DataImage from '../../Images/Data.jpg'
import Employees from '../../Images/Employees.jpg'
import BioMechanical from '../../Images/BioMechanical.jpg'
import Points from '../../Images/Points.jpg'


function Maternity() {

    let currDate = new Date();
    let month = currDate.getMonth() + 1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let lastDay = new Date(year, month, 0);
    let date = year+"/"+month+"/"+lastDay.getDate();

    return (
        <>
        <h1 className="display-1 text-center my-4">Maternity</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-2">
            <div className="col">
                <div className="card h-100">
                <img src={CaseStudy} className="card-img-top img-responsive" />
                <div className="card-body">
                    <h5 className="card-title">Case Study</h5>
                    <p className="card-text">Next case study will be due on:</p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={DataImage} className="card-img-top img-responsive" />
                <div className="card-body">
                    <h5 className="card-title">Data</h5>
                    <p className="card-text">Next data submission will be due on:</p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={Employees} className="card-img-top img-responsive" />
                <div className="card-body">
                    <h5 className="card-title">Employees</h5>
                    <p className="card-text">List of Employees</p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={BioMechanical} className="card-img-top img-responsive" />
                <div className="card-body">
                    <h5 className="card-title">Bio Mech Support</h5>
                    <p className="card-text">No Messages</p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={Points} className="card-img-top img-responsive" />
                <div className="card-body">
                    <h5 className="card-title">Your current Points Tally Is</h5>
                    <p className="card-text">Employee's score:</p>
                </div>
                </div>
            </div>
        </div>
        </>
    )

        {/* <div id="wrapper">
            <h1 id="title">Maternity Home Page</h1>
            <div id="Hcontainer">
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/casestudyPg">Case Study</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Case Study will Due on:
                        <div className="inner_mssg">{date}</div>
                    </div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/datainputPg">Data</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Data Submission will Due on:
                        <div className="inner_mssg">{date}</div>
                    </div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/empofmthPg">Employees</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">A list of employees</div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/maternity/biomechPg">BioMech Support</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">No messages</div>
                </div>
                <div id="pointsTally" className="with_border">
                    <div id="pointsTally_header">Your current points tally is:</div>
                    <div className="inner_mssg">Employee's score</div>
                </div>
            </div>
        </div> */}
    
}


export default Maternity;