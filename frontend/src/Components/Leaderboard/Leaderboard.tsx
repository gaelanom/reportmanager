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
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(function(d: any, idx: number) {
                            if (d.firstName && d.lastName) {
                                return (
                                    <tr>
                                        <th scope="row">{d.firstName}</th>
                                        <td>{d.lastName}</td>
                                        <td>{d.department}</td>
                                        <td>{d.score}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Leaderboard;