import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, phone, name, password) => {
    const {data} = await $host.post('api/user/registration', {email, phone, name, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const edit = async (email, phone, name, password, id) => {
    const {data} = await $host.post('api/user/edit', {email, phone, name, password, id})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const userInfo = async (id) => {
    const {data} = await $host.get(`api/user/info?id=${id}`)
    return data
}