import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// function getMonthLast(){
//     let date = new Date();
//     let currentMonth = date.getMonth();
//     let nextMonth = currentMonth;
//     let nextMonthFirstDay = new Date(date.getFullYear(),nextMonth,1);
//     let oneDay = 1000*60*60*24;
//     let lastDate = date.getFullYear(nextMonthFirstDay-oneDay);
//
//     return lastDate;
// }


function Maternity() {

    let currDate = new Date();
    let month = currDate.getMonth() + 1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let lastDay = new Date(year, month, 0);
    let date = year+"/"+month+"/"+lastDay.getDate();

    return (
        <div id="wrapper">
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
        </div>
    );
}


export default Maternity;