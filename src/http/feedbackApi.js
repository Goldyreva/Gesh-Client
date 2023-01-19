import {$host} from "./index";

export const create = async (phone, name, message) => {
    const {data} = await $host.post('api/feedback/create', {phone, name, message})
    return data
}
export const change = async (id, status) => {
    const {data} = await $host.post('api/feedback/change', {id, status})
    return data
}

export const getAll = async () => {
    const response = await $host.get('api/feedback/getAll')
    return response
}