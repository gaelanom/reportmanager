import React from 'react';
import axios from 'axios';


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
          employees: []
        };
      }

    componentDidMount() {
        axios.get('http://localhost:8080/api/employees')
        .then(response => response.data)
        .then(data => {
            this.setState({
                employees: data
            })
        })
    }

    render() {
        console.log(this.state.employees)

        return (
            
            <ul>
                {this.state.employees.map(function(d, idx){
                    return (<li key={idx}>ID: {d.id} Name: {d.firstName} LastName: {d.lastName} Department: {d.department} Department Head: {d.departmentHead}</li>)
                })}
            </ul>
        )
    }
}