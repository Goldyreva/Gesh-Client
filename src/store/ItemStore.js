import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor() {
        this._types = [
            {id: 1, name: "Family"},
            {id: 2, name: "Gost"},
            {id: 3, name: "Partner"}
        ]
        this._items = [
            {id: 1, name: 'Семейный номер', descriprion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ', price: 6000, img: 'ededc506-0d11-4063-af2e-44cee8420c38.jpg', count_people: 6, typeId: 1 },
            {id: 2, name: 'Гостевой номер', descriprion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ', price: 5000, img: 'ededc506-0d11-4063-af2e-44cee8420c38.jpg', count_people: 3, typeId: 2 },
            {id: 3, name: 'Номер для пары', descriprion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ', price: 4000, img: 'ededc506-0d11-4063-af2e-44cee8420c38.jpg', count_people: 2, typeId: 3 },
            {id: 4, name: 'Семейный номер', descriprion: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ', price: 10000, img: 'PHOTO-2022-08-15-09-08-52 1.jpg', count_people: 8, typeId: 1 }
        ]
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types
    }
    setIsItem(items){
        this._items = items
    }

    get types(){
        return this._types
    }
    get items(){
        return this._items
    }
}