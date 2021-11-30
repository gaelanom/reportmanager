import React from 'react';
import axios from 'axios';
import { getAllEmployees, createEmployee } from '../../API/employees'


type Employee = {
    firstName: string;
    lastName: string;
    id: number;
    department: string;
    isDepartmentHead: boolean;
}

export default class Employees extends React.Component <any, any> {

    constructor(props: any) {
        super(props)

        this.state = {
          employees: [],
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          score: 0,
          departmentHead: false,
          department: ""
        };
      }

    componentDidMount() {
        
        getAllEmployees().then(data => {
            this.setState({
                employees: data
            })
        })

    }

    handleUsernameOnChange(e: any) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordOnChange(e: any) {
        this.setState({
            password: e.target.value
        })
    }

    handleFirstNameOnChange(e: any) {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameOnChange(e: any) {
        this.setState({
            lastName: e.target.value
        })
    }

    handleDepartmentNameOnChange(e: any) {
        this.setState({
            department: e.target.value
        })
    }

    handleScoreOnChange(e: any) {
        this.setState({
            score: Number(e.target.value)
        })
    }

    handleDepartmentHeadOnChange(e: any) {
        this.setState({
            departmentHead: e.target.checked
        })
    }

    handleSubmit() {
        const payload = {
            "username": this.state.username,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "department": this.state.department,
            "departmentHead": this.state.departmentHead,
            "score": this.state.score,
            "password": this.state.password
        }

        createEmployee(payload).then((data: any) => {
            ($('#add-employee-modal') as any).modal('hide');
            ($('#complete-modal') as any).modal('show');
        }).catch((error) => console.log(error));
    }

    render() {

        let employeesData = [...this.state.employees]
        employeesData.sort((a: any, b: any) => b.score - a.score)

        return (
            <>
            <div className="card mx-auto w-75 my-5">
                <h1 className="card-header card-title text-center display-4">All Employees</h1>
                <div className="card-body">
                <button className="btn btn-primary justify-content-start" type="button" data-bs-toggle="modal" data-bs-target="#add-employee-modal">Create New Employee</button>
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesData.map(function(d: any, idx: number) {
                                // necessary to get rid of the default / incorrect data
                                if (d.firstName && d.lastName) {
                                    return (
                                        <tr>
                                            <th scope="row">{d.firstName}</th>
                                            <td>{d.lastName}</td>
                                            <td>{d.score}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Forms Modal */}
            <div className="modal fade" id="add-employee-modal" aria-labelledby="modal-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-label">Create New Employee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="employee-username-input" className="form-label">Username</label>
                            <input className="form-control" id="employee-username-input" onChange={this.handleUsernameOnChange.bind(this)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee-password-input" className="form-label">Password</label>
                            <input className="form-control" id="employee-password-input" onChange={this.handlePasswordOnChange.bind(this)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee-firstname-input" className="form-label">First Name</label>
                            <input className="form-control" id="employee-firstname-input" onChange={this.handleFirstNameOnChange.bind(this)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee-lastname-input" className="form-label">Last Name</label>
                            <input className="form-control" id="employee-lastname-input" onChange={this.handleLastNameOnChange.bind(this)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee-department-input" className="form-label">Department Name</label>
                            <input className="form-control" id="employee-department-input" onChange={this.handleDepartmentNameOnChange.bind(this)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employee-score-input" className="form-label">Score</label>
                            <input className="form-control" id="employee-score-input" onChange={this.handleScoreOnChange.bind(this)} />
                        </div>
                        <div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={this.handleDepartmentHeadOnChange.bind(this)} />
                            <label className="form-check-label">
                                Department Head
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Successful Request Made Modal */}
            <div className="modal fade" id="complete-modal" aria-labelledby="form-complete-modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="form-complete-modal">Successfully Added New Department!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
