import React from "react";
import "../../Departments.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { getReportById, getAllReports } from '../../API/reports';
// import { CSVLink, CSVDownload } from "react-csv";
import { json2csv } from "json-2-csv";


class TmpExport extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // this.json2csvCallback = this.json2csvCallback.bind(this);

    this.state = {
      reports: [],
      csv_data: []
    };
  }

  componentDidMount() {
        
    getAllReports().then(data => {
        this.setState({
          reports: data
        })
    })

  }

  // json2csvCallback = (err: any, csv: any) => {
  //   if (err) throw err;
  //   if(csv){
  //     csvdata = csv;
  //     this.state.csv_data = csv;
  //     this.setState({
  //       csv_data: csv
  //     })
  //     console.log(this.state.csv_data);
  //     console.log(csvdata);
  //     return csv;
  //   }
  // }

  render() {
    let reportsData = [...this.state.reports]
    let csvdata: any;
    
    return (
      <div className="card mx-auto w-75 my-5">
          <h1 className="card-header card-title text-center display-4">All reports</h1>
          <div className="card-body">
              <table className="table table-hover table-responsive">
              <thead>
                  <tr>
                  <th scope="col">Report Name</th>
                  <th scope="col">Report ID</th>
                  <th scope="col">Department</th>
                  <th scope="col">Month</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Download</th>
                  <th scope="col">Data</th>
                  </tr>
              </thead>
              <tbody>
                  {reportsData.map(function(d: any, idx: number) {
                      // Report = {id, name, departmentName, departmentId, month, createdAt, editedAt, createdBy, editedBy, questions, groupings}
                      
                      if (d.name && d.departmentName ) {
                        
                        let json2csvCallback = function(err: any, csv: any) {
                          if (err) throw err;
                          if(csv){
                            csvdata = csv;
                            // this.setState({
                            //   csv_data: csv
                            // })
                            // console.log(this.state.csv_data);
                            console.log(csvdata); // empty right now
                          }
                        }

                        json2csv(d, json2csvCallback);
                        
                        // console.log(csvdata);
                        // console.log(this.state.csv_data);
                        // csvdata = this.state.csv_data;
                          return (
                              <tr>
                                  <th scope="row">{d.name}</th>
                                  <td>{d.id}</td>
                                  <td>{d.departmentName}</td>
                                  <td>{d.month}</td>
                                  <td>{d.createdBy}</td>
                                  <td>
                                    <button>Download</button>
                                  </td>
                                  <td>
                                    {/* Testing purpose, just want to print it out */}
                                    {csvdata}
                                  </td>
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

export default TmpExport;
