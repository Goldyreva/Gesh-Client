import {makeAutoObservable} from "mobx";

export default class MenuStore {

    constructor() {
        this._active = false
        makeAutoObservable(this)
    }

    setActive (bool) {
        this._active = bool
    }

    get isActive () {
        return this._active
    }

}