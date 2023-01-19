import {makeAutoObservable} from "mobx";

export default class AdminStore{
    constructor() {
        this._active = 1
        makeAutoObservable(this)
    }

    setActive (int) {
        this._active = int
    }

    get isActive () {
        return this._active
    }
}