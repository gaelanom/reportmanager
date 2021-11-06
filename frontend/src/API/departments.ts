import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

export function getDepartments() {
    return axios.get(BASE_URL + "departments").then(res => res.data)
}

