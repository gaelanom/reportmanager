import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import * as Dev from '../../Dev'

type Employee = {
    firstName: string;
    lastName: string;
    id: number;
    department: string;
    isDepartmentHead: boolean;
}

export default class Employees extends React.Component<any, {employees:Employee[]}> {

    constructor(props: any) {
        super(props)

        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        const CONFIGS: AxiosRequestConfig<Employee[]> = {
            headers: { 
                'Authorization': 'Basic ' + window.btoa(Dev.USERNAME + ":" + Dev.PASSWORD) }
        }

        axios.get<Employee[]>('http://localhost:8080/api/employees', CONFIGS)
            .then(response => response.data)
            .then((data:Employee[]) => {
                // Todo: server should not returns a login form on authentication failure.
                if(!Array.isArray(data)){
                    console.warn("Employees data is not array")
                    return;
                }
                this.setState({
                    employees: data
                })
            })
            .catch(reason => console.log(reason))
    }

    render() {
        return (
            <ul>
                {this.state.employees.map(function (d: any, idx: number) {
                    return (<li key={idx}>ID: {d.id} Name: {d.firstName} LastName: {d.lastName} Department: {d.department} Department Head: {d.departmentHead ? 'true' : 'false'}</li>)
                })}
            </ul>
        )
    }
}