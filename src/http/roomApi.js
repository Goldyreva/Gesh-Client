import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const create = async (name) => {
    const {data} = await $authHost.post('api/item/create', name)
    return data
}
export const deleteOneType = async (id) => {
    const {data} = await $authHost.post('api/item/delete', {id})
    return data
}
export const getAll = async () => {
    const response = await $host.get('api/item/getAll')
    return response
}