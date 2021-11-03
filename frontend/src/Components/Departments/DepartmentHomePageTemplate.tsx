import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CaseStudy from '../../Images/CaseStudy.jpg'
import DataImage from '../../Images/Data.jpg'
import Employees from '../../Images/Employees.jpg'
import BioMechanical from '../../Images/BioMechanical.jpg'
import Points from '../../Images/Points.jpg'

// I extract the departmentID by analysing the URL
// But may want to get both the departmentID & departmentName by ReactComponents <-------- I don't really know how.


function DepartmentHomePageTemplate() {

    let currDate = new Date();
    let month = currDate.getMonth() + 1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let lastDay = new Date(year, month, 0);
    let date = year+"/"+month+"/"+lastDay.getDate();

    // Hard-coded method of extract departmentID from URL
    const currentURL = window.location.href;
    const splitedTokens = currentURL.split("/");
    const lengthofTokens = splitedTokens.length;
    // Maybe want to get id by another way
    const departmentID = splitedTokens[lengthofTokens-1];

    return (
        <>
        <h1 className="display-1 text-center my-4">**"Department Name" based on the id of the URL**</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-2">
            <div className="col">
                <div className="card h-100">
                <img src={CaseStudy} className="card-img-top img-responsive" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {/* Dynamic URL */}
                            <Link to={departmentID+"/casestudyPage"}>Case Study</Link>
                        </h5>
                        <p className="card-text">Next case study will be due on:
                            <div>{date}</div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={DataImage} className="card-img-top img-responsive" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {/* Unchanged URL */}
                            <Link to="/maternity-data-input">Data</Link>
                        </h5>
                        <p className="card-text">Next data submission will be due on:
                            <div>{date}</div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={Employees} className="card-img-top img-responsive" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {/* Dynamic URL */}
                            <Link to={departmentID+"/employeesPage"}>Employees</Link>
                        </h5>
                        <p className="card-text">List of Employees</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100">
                <img src={BioMechanical} className="card-img-top img-responsive" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {/* Dynamic URL */}
                            <Link to={departmentID+"/biomechPage"}>Bio Mech Support</Link>
                        </h5>
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
    );
}


export default DepartmentHomePageTemplate;
