import {$authHost} from "./index";

export const create = async (startDate, endDate, countDay, userId, itemId)  => {
    const {data} = await $authHost.post(`api/order/create`, {startDate, endDate, countDay, userId, itemId})
    return data
}
export const getForUser = async (id) => {
    const {data} = await $authHost.get(`api/order/getForUser?userId=${id}`)
    return data
}
export const getAll = async (id) => {
    const {data} = await $authHost.get(`api/order/getAll`)
    return data
}
export const update = async (id, start_date, end_date, count_day, status) => {
    const {data} = await $authHost.post(`api/order/update`, {id, start_date, end_date, count_day, status})
    return data
}
export const updateStatus = async (id, status) => {
    const {data} = await $authHost.post(`api/order/updateStatus`, {id, status})
    return data
}