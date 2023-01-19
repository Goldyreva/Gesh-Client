import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor() {
        this._types = []
        this._items = []
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types
    }
    setIsItem(items){
        this._items = items
    }
    addType(type){
        this._types.push(type)
    }

    get types(){
        return this._types
    }
    get items(){
        return this._items
    }
}