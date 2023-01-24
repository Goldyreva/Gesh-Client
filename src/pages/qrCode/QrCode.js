import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOne} from "../../http/orderApi";
import {Context} from "../../index";
import s from "./QrCode.module.sass"

const QrCode = () => {
    let {user} = useContext(Context)
    const params = useParams();
    const [info, setInfo] = useState()
    const [count, setCount] = useState(0)
    useEffect(() => {
        getOne(params.id).then(data => setInfo(data)).finally(() => setCount(1))
    }, [])
    if(count < 1) {
        return <h2>Загрузка...</h2>
    }
    console.log(info)
    return (
        <div className={s.root}>
            {
                user.user.role === "ADMIN"
                    ?<>
                        <ul>
                            <li>Номер заказа: {info.id}</li>
                            <li>Даты пребывания: {`${new Date(info.start_date).toLocaleDateString('ru-RU')} - ${new Date(info.end_date).toLocaleDateString('ru-RU')}`}</li>
                            <li>Статус: {info.status}</li>
                            <li>Объект: {info.item.name}</li>
                        </ul>
                    </>
                    : <p>нет доступа</p>
        }

        </div>
    );
};

export default QrCode;