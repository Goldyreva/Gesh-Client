import {$host} from "./index";

export const create = async (startDate, endDate, countDay, userId, itemId)  => {
    const {data} = await $host.post(`api/order/create`, {startDate, endDate, countDay, userId, itemId})
    return data
}
export const getForUser = async (id) => {
    const {data} = await $host.get(`api/order/getForUser?userId=${id}`)
    return data
}