import axios from 'axios'

const URL = 'http://localhost:8080/api/employees'

export function getAllEmployees() {

    return axios.get(URL).then(res => res.data)

}

export function createEmployee(obj: any) {
    return axios.post(URL, obj).then((res) => res.data)
}