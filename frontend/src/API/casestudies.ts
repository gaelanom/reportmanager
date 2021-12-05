import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/casestudies/'

export function getCaseStudies() {
    return axios.get(BASE_URL).then(res => res.data)
}

export function addCaseStudy(payload: any) {
    return axios.post(BASE_URL, payload).then((res) => res.data)
}

export function getCaseStudyById(id: string) {
    return axios.get(BASE_URL + id).then((res) => res.data)
}