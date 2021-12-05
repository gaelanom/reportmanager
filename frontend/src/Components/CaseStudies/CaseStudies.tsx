import React from "react";
import Api from "../../API/Api";

class CaseStudies extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      caseStudies: null
    }

  }

  componentDidMount() {
    Api.CaseStudies.getCaseStudyById(this.props.id).then(data => {
      this.setState({
        caseStudies: data
      })
    })
  }

  render() {
    const department = this.props.location.state.department || null;
    const id = this.props.location.state.id || null;
    const caseStudy = this.state.caseStudies
    return (
        <>
        <div className="card mx-auto w-75 my-5">
            <h1 className="card-header card-title text-center display-4">{department} Case Studies</h1>
            <div className="card-body">
            {caseStudy ?
            <div>{caseStudy}</div> :
            <div>No Case Studies</div>
            }
                
            </div>
        </div>
        </>
    )
  }
}

export default CaseStudies;
