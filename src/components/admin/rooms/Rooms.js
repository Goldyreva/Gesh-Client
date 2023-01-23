import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Rooms.module.sass";
import {Context} from "../../../index";
import {create, deleteOneType} from "../../../http/roomApi";
import Room from "./room/Room";

const Rooms = observer( () => {
    let {item} = useContext(Context)
    const [roomValue, setRoomValue] = useState([])
    console.log(roomValue)
    const addItem = async () => {
        let data = await create(roomValue)
        item.setIsItem(data)
    }
    const roomHandler = (e) =>{
        if(e.target.name === 'files'){
            const formData = new FormData()
            // img.append('foto', e.target.files)
            console.log(formData)
            // setRoomValue( roomValue => ({...roomValue, [formData]))
        }else{
            setRoomValue( roomValue => ({...roomValue, [e.target.name]: e.target.value}))
        }
            console.log(roomValue)
    }
    const deleteType = async (id) => {
        let data = await deleteOneType(id)
        item.setIsItem(data)
    }
    item.types.map(type => {console.log(type.name)}
        // <option value={type.name} key={type.id}>{type.name}</option>
    )
    return (
        <div className={s.root}>
            <h4>Добавить номер</h4>
            <div className={s.root__add_form}>

                <input type="text" className={s.root__add_input} placeholder="Название" name="name" onChange={roomHandler}/>
                <input type="number" className={s.root__add_input} placeholder="Стоимость" name="coast" onChange={roomHandler}/>
                <input type="number" className={s.root__add_input} placeholder="Количество людей" name="count" onChange={roomHandler}/>
                <textarea className={s.root__add_input} placeholder="Описание" name="description" onChange={roomHandler}>
                </textarea>
                <select name="type_select" id="" onChange={roomHandler}>>
                    {
                        item.types.map(type =>
                            <option value={type.name} key={type.id}>{type.name}</option>
                        )
                    }
                </select>
                <form encType="multipart/form-data" action="" method="" id='formFile'>
                    <input type="file" className={s.root__add_input} placeholder="Изображение" name="files" onChange={roomHandler}/>
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
                    <Room item={item} del={deleteType} />
                )}
            </div>
        </div>
    );
});

export default Rooms;