import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Types.module.sass";
import {Context} from "../../../index";
import {create, deleteOneType} from "../../../http/typeApi";
import Type from "./type/Type";

const Types = observer( () => {
    let {item} = useContext(Context)
    const [typeValue, setTypeValue] = useState()
    console.log(typeValue)
    const addType = async () => {
        let data = await create(typeValue)
        item.addType(data)
    }
    const deleteType = async (id) => {
        let data = await deleteOneType(id)
        item.setTypes(data)
    }
    return (
        <div className={s.root}>
            <h4>Добавить тип</h4>
            <div className={s.root__add_form}>
                <input type="text" className={s.root__add_input} placeholder="Название" name="name" onChange={e => setTypeValue(e.target.value)}/>
                <p onClick={() => addType()} className={s.root__add_btn}>Сохранить</p>
            </div>
            <h4>Список типов</h4>
            <div className={s.root__table}>
                <div className={s.root__header}>
                    <p><b>ID</b></p>
                    <p><b>Название</b></p>
                    <p><b>Удалить</b></p>
                </div>
                    {item.types.map(item =>
                        <Type item={item} del={deleteType}/>
                    )}

            </div>
        </div>
    );
});

export default Types;