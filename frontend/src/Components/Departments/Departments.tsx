import React from 'react'
import '../../Departments.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Api from "../../API/Api";

class Departments extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            name: ""
        }
    }

    componentDidMount() {
        
        Api.Departments.getDepartments().then(data => {
            console.log(data)
        })

    }

    render() {

        return (
          <div>Test</div>
        )
    }
}


export default Departments;
