import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class CaseStudies extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }

  render() {
    const department = this.props.location.state.department || null;
    const id = this.props.location.state.id || null;
    return (
        <>
        <div>Case Studies {department} {id}</div>
        </>
    )
  }
}

export default CaseStudies;
