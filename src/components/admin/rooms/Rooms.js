import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Rooms.module.sass";
import {Context} from "../../../index";
import {create, deleteOneType} from "../../../http/roomApi";
import Room from "./room/Room";

const Rooms = observer( () => {
    let {item} = useContext(Context)
    const [roomValue, setRoomValue] = useState({
        name: "",
        cost: "",
        count: "",
        description: "",
        type_select: '1'
    })
    let filesObj = []

    const addItem = async () => {
        if(filesObj.length < 2) {
            return
        }

        let data = new FormData()
        data.append('name', roomValue.name)
        data.append('price', roomValue.cost)
        data.append('count_people', roomValue.count)
        data.append('description', roomValue.description)
        data.append('typeId', roomValue.type_select)
        for (let i = 0; i < filesObj.length; i++) {
            data.append('img', filesObj[i], filesObj[i].name)
        }

        let dataRoom = await create(data)
        item.setIsItem(dataRoom)
    }

    const roomHandler = (e) =>{
        if(e.target.name === 'files') {
            for (let i = 0; i < e.target.files.length; i++) {filesObj.push(e.target.files[i])}
        } else{
            setRoomValue( roomValue => ({...roomValue, [e.target.name]: e.target.value}))
        }
    }

    const deleteType = async (id) => {
        let data = await deleteOneType(id)
        item.setIsItem(data)
    }

    return (
        <div className={s.root}>
            <h4>Добавить номер</h4>
            <div className={s.root__add_form}>

                <input type="text" className={s.root__add_input} placeholder="Название" name="name" onChange={roomHandler}/>
                <input type="number" className={s.root__add_input} placeholder="Стоимость" name="cost" onChange={roomHandler}/>
                <input type="number" className={s.root__add_input} placeholder="Количество людей" name="count" onChange={roomHandler}/>
                <textarea className={s.root__add_input} placeholder="Описание" name="description" onChange={roomHandler}>
                </textarea>
                <select name="type_select" id="" onChange={roomHandler}>>
                    {
                        item.types.map(type =>
                            <option value={type.id} key={type.id}>{type.name}</option>
                        )
                    }
                </select>
                <form encType="multipart/form-data" action="" method="" id='formFile'>
                    <input type="file" className={s.root__add_input} placeholder="Изображение" multiple name="files" onChange={roomHandler}/>
                </form>
                    <p onClick={() => addItem()} className={s.root__add_btn}>Сохранить</p>

            </div>
            <h4>Список номеров</h4>
            <div className={s.root__table}>
                <div className={s.root__header}>
                    <p><b>ID</b></p>
                    <p><b>Изображение</b></p>
                    <p><b>Название</b></p>
                    <p><b>Описание</b></p>
                    <p><b>Стоимость</b></p>
                    <p><b>Количество людей</b></p>
                    <p><b>Удалить</b></p>
                </div>
                {item.items.map(item =>
                    <Room item={item} del={deleteType} key={`room${item.id}`}/>
                )}
            </div>
        </div>
    );
});

export default Rooms;