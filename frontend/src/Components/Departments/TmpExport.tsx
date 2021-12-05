import React from "react";
import "../../Departments.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { getReportById, getAllReports, getQuestionsByreportID } from '../../API/reports';
import { CSVLink, CSVDownload } from "react-csv";
import { json2csv } from "json-2-csv";

// Question = {id, createdAt, editedAt, departmentId, group, order, question, answer, type, choices}
type Questions = {

}

class TmpExport extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      reports: [],
      questions: []
    };
    
  }

  componentDidMount() {
        
    getAllReports().then(data => {
        this.setState({
          reports: data
        })
        let questionsList = [];
        // console.log(this.state.reports);
        this.state.reports.map((d: any, idx: number) => {
          getQuestionsByreportID(d.id).then(data2 => {
            this.setState({
              questions: data2
            })
            // console.log(data2)
          })
        
        })
    })
    
  }

  render() {
    let reportsData = [...this.state.reports]
    
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
                  <th scope="col"># of Questions</th>
                  </tr>
              </thead>
              <tbody>
                  {reportsData.map(function(d: any, idx: number) {
                      // Report = {id, name, departmentName, departmentId, month, createdAt, editedAt, createdBy, editedBy, questions, groupings}
                      
                      if (d.name && d.departmentName && d.questions[idx] && d.id) {
                        
                        d.questions.map((q: any, idx: number) => {
                          console.log(q)
                        })

                          return (
                              <tr>
                                  <th scope="row">{d.name}</th>
                                  <td>{d.id}</td>
                                  <td>{d.departmentName}</td>
                                  <td>{d.month}</td>
                                  <td>{d.createdBy}</td>
                                  <td>
                                    <CSVLink data={[d]}>Download</CSVLink>
                                  </td>
                                  <td>
                                    {d.questions.length}
                                  </td>
                              </tr>
                          )
                        // })
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
