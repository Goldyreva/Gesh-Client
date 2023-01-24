import {makeAutoObservable} from "mobx";
import ItemStore from "./ItemStore";

export default class CartStore {

    constructor() {
        this._active = false
        makeAutoObservable(this)
        this._cart = []
    }

    setActive (bool) {
        this._active = bool
    }
    addToCart (array) {
        this._cart.push(array)
    }

    get isActive () {
        return this._active
    }
    get getCart () {
        return this._cart
    }
}