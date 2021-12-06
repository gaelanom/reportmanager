import React from 'react';
import * as echarts from "echarts";
import {
  withRouter
} from "react-router-dom";
import Api from "../../API/Api";
import DepartmentReports from "../Departments/DepartmentReports"

class DataVisualization extends React.Component<any, any> {
  bar: any;

  constructor(props: any) {
    super(props);
    this.bar = React.createRef();
    this.state = {
      questions: [],
    };
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id || 1;

    const reports :any =  await Api.NewReports.getReportByDeptId(id)

    const reportId = id
    const questions:[] = await Api.NewReports.getQuestionsByreportID(reportId) || []

    const _questions = questions.filter((e: { type: string }) => e.type == "Numerical");
    this.setState({
      questions: _questions,
    });

    this.initChart(_questions, id);
  }

  initChart = (datas: any, id:number) => {
    var myChart = echarts.init(this.bar.current);
    myChart.setOption({
      title: { text: `Report ID: ${id}` },
      tooltip: {},
      grid: {
        left: "5%",
        right: "5%",
      },
      xAxis: {
        data: datas.map((e: any) => e.question),
        axisLabel: {
          // rotate:40,
          interval: 0,
        },
      },
      yAxis: {
        // name: "answer",
      },
      series: [
        {
          type: "bar",
          label: {
            position: "top",
            show: true,
          },
          data: datas.map((e: any) => e.answer),
        },
      ],
    });
  };

  render() {
    // let employeesData = [...this.state.employees];

    return (
      <div className="card mx-auto w-75 my-5">
        <h1 className="card-header card-title text-center display-4">
          DataVisualization
        </h1>
        <div className="card-body">
          <div
            ref={this.bar}
            id="main"
            style={{ width: "100%", height: 500 }}
          ></div>
        </div>
      </div>
    );
  }
}


export default withRouter(DataVisualization);