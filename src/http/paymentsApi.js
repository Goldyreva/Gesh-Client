import {$authHost} from "./index";

export const create = async (body) => {
    const {data} = await $authHost.post('api/payment/create', body)
    return data
}

export const confirm = async (body) => {
    const {data} = await $authHost.post('api/payment/confirm', body)
    return data
}

export const refund = async (body) => {
    const {data} = await $authHost.post('api/payment/refund', body)
    return data
}

export const get = async (id) => {
    const {data} = await $authHost.get(`api/payment/${id}`)
    return data
}

export const getReceipt = async (id) => {
    const {data} = await $authHost.get(`api/payment/getReceipt/${id}`)
    return data
}