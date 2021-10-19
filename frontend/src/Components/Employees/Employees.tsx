import React from 'react';
import axios from 'axios';
import { getAllEmployees } from '../../API/employees'


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
        
        getAllEmployees().then(data => {
            this.setState({
                employees: data
            })
        })

    }

    render() {

        return (
            
            <ul>
                {this.state.employees.map(function(d: any, idx: number){
                    return (<li key={idx}>ID: {d.id} Name: {d.firstName} LastName: {d.lastName} Department: {d.department} Department Head: {d.departmentHead}</li>)
                })}
            </ul>
        )
    }
}
