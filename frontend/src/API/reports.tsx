import axios from 'axios'

const BASEURL = 'http://localhost:8080/api/reports/'

function newReport(department: string) {
    return axios.post(BASEURL, {"department":department}).then(res => res.data)
}

function getReport(id: number) {
    return axios.get(BASEURL + id).then(res => res.data)
}

function addQuestion(id: number, question: string) {
    return axios.post(BASEURL + id + '/questions', {"question":question}).then(res => res.data.questions)
}

function updateQuestion(id: number, question: string, answer: string) {
    return axios.put(BASEURL + 'questions/' + id, {"question":question, "answer":answer}).then(res => res.data)
}

