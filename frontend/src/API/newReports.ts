import axios from 'axios'

const BASEURL = "http://localhost:8080/api/newreports/";


export function getQuestionsByreportID(id: any) {
  return axios.get(`${BASEURL}${id}/questions`).then((res) => res.data);
}

export function getReportByDeptId(id: any) {
  return axios
    .get(BASEURL, { params: { departmentId: id } })
    .then((res) => res.data);
}
