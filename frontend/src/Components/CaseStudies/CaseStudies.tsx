import React from "react";
import Api from "../../API/Api";

class CaseStudies extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      caseStudies: null,
      summary: "",
      story: ""
    }

  }

  componentDidMount() {
    Api.CaseStudies.getCaseStudyById(this.props.id).then(data => {
      this.setState({
        caseStudies: data
      })
    })
  }

  handleSummaryOnChange = (e: any) => {
    this.setState({
      summary: e.target.value
    })
  }

  handleStoryOnChange = (e: any) => {
    this.setState({
      story: e.target.value
    })
  }

  handleSubmit = () => {
    const department = this.props.location.state.department || null;
    const id = this.props.location.state.id || null;
    const payload = {
      "summary": this.state.summary,
      "story": this.state.story,
      "departmentId": id,
      "departmentName": department
    }

    Api.CaseStudies.addCaseStudy(payload).then((data: any) => {
      ($('#add-case-studies-modal') as any).modal('hide');
      ($('#complete-modal') as any).modal('show');
    }).catch((error) => console.log(error));
  }

  render() {
    const department = this.props.location.state.department || null;
    const id = this.props.location.state.id || null;
    const caseStudy = this.state.caseStudies
    return (
        <>
        {caseStudy ?
          <div>{caseStudy}</div> :
          <div className="card mx-auto w-75 my-5" style={{"width": "18rem"}}>
            <h5 className="card-title text-center card-header display-4">{department} Case Studies</h5>
            <div className="card-body">
              <p className="card-text fs-4">Sorry, there are no case studies available.</p>
              <a className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-case-studies-modal">Click here to create a new case study</a>
            </div>
          </div>
        }

        {/* Forms Modal */}
        <div className="modal fade" id="add-case-studies-modal" aria-labelledby="modal-label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modal-label">Create New Case Study</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="employee-summary-input" className="form-label">Summary</label>
                        <input className="form-control" id="employee-summary-input" onChange={this.handleSummaryOnChange.bind(this)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employee-story-input" className="form-label">Story</label>
                        <input className="form-control" id="employee-story-input" onChange={this.handleStoryOnChange.bind(this)} />
                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        </div>


        {/* Successful Request Made Modal */}
        <div className="modal fade" id="complete-modal" aria-labelledby="form-complete-modal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="form-complete-modal">Successfully Added New Case Study!</h5>
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

export default CaseStudies;
