import {makeAutoObservable} from "mobx";

export default class OrderDetailsStore {

    constructor() {
        this._active = false
        this._id = null
        this._orders = []
        makeAutoObservable(this)
    }

    setActive (bool) {
        this._active = bool
    }
    setId (id) {
        this._id = id
    }
    setOrders(orders) {
        this._orders = orders
    }

    get isActive () {
        return this._active
    }
    get isId () {
        return this._id
    }
    get orders(){
        return this._orders
    }

}