import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

export function getDepartments() {
    return axios.get(BASE_URL + "departments").then(res => res.data)
}

export function addDepartment(params: any) {
    return axios.post(BASE_URL + "departments", params).then((res) => res.data)
}
