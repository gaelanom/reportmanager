import React from 'react';
import Api from "../../API/Api";

class Leaderboard extends React.Component <any, any>  {

    constructor(props: any) {
        super(props)

        this.state = {
          employees: []
        };
      }

    componentDidMount() {
        
        Api.Employees.getAllEmployees().then(data => {
            this.setState({
                employees: data
            })
        })

    }

    render() {

        return (
            <div className="card mx-auto w-75 my-5">
                <h1 className="card-header card-title text-center display-4">Leaderboards</h1>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.employees.map(function(d: any, idx: number){
                            return (
                                <li className="list-group-item text-center display-6" key={idx}>
                                    ID: {d.id} Name: {d.firstName} LastName: {d.lastName} Department: {d.department} Department Head: {d.departmentHead}
                                </li>)
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


export default Leaderboard;