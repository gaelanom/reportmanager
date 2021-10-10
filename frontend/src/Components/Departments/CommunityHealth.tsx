import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function CommunityHealth() {

    let currDate = new Date();
    let month = currDate.getMonth() + 1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let lastDay = new Date(year, month, 0);
    let date = year+"/"+month+"/"+lastDay.getDate();

    return (
        <div id="wrapper">
            <h1 id="title">CommunityHealth Home Page</h1>
            <div id="Hcontainer">
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/communityhealth/casestudyPg">Case Study</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Case Study will Due on:
                        <div className="inner_mssg">{date}</div>
                    </div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/communityhealth/datainputPg">Data</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">Next Data Submission will Due on:
                        <div className="inner_mssg">{date}</div>
                    </div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/communityhealth/empofmthPg">Employees</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">A list of employees</div>
                </div>
                <div className="with_border">
                    <Router>
                        <button className="butt">
                            <Link to="/communityhealth/biomechPg">BioMech Support</Link>
                        </button>
                    </Router>
                    <div className="inner_mssg">No messages</div>
                </div>
                <div id="pointsTally" className="with_border">
                    <div id="pointsTally_header">Your current points tally is:</div>
                    <div className="inner_mssg">Employee's score</div>
                </div>
            </div>
        </div>
    );
}


export default CommunityHealth;