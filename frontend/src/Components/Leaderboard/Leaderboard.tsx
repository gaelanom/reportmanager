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
                    {/* <ul className="list-group">
                        {this.state.employees.map(function(d: any, idx: number){
                            return (
                                <li className="list-group-item text-center display-6" key={idx}>
                                    ID: {d.id} Name: {d.firstName} LastName: {d.lastName} Department: {d.department} Department Head: {d.departmentHead}
                                </li>)
                        })}
                    </ul> */}
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
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Leaderboard;