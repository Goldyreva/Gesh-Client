import {makeAutoObservable} from "mobx";
import ItemStore from "./ItemStore";

export default class CartStore {

    constructor() {
        this._active = false
        this._cart = []
        makeAutoObservable(this)
    }

    setActive (bool) {
        this._active = bool
    }
    addToCart (array) {
        this._cart.push(array)
    }

    clearCart () {
        this._cart = []
    }
    get isActive () {
        return this._active
    }
    get getCart () {
        return this._cart
    }
}