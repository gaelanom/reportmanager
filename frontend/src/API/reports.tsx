import axios from 'axios'

const BASEURL = 'http://localhost:8080/api/reports/'

export function newReport(department: string) {
    return axios.post(BASEURL, {"department":department}).then(res => res.data)
}

export function getReport(id: number) {
    return axios.get(BASEURL + id).then(res => res.data)
}

export function addEmptyQuestion(id: number) {
    return axios.post(BASEURL + id + '/questions').then(res => res.data.questions)
}

export function addQuestion(id: number, question: string) {
    return axios.post(BASEURL + id + '/questions', {"question":question}).then(res => res.data.questions)
}

export function updateQuestion(id: number, question: string, answer: string) {
    return axios.put(BASEURL + 'questions/' + id, {"question":question, "answer":answer}).then(res => res.data)
}

