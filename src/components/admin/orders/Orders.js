import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Orders.module.sass";
import {Context} from "../../../index";
import {create, deleteOneType} from "../../../http/typeApi";
import Order from "./order/Order";
import {getAll} from "../../../http/orderApi";

const Orders = observer( () => {
    let {orderDetails} = useContext(Context)
    const [typeValue, setTypeValue] = useState()

    const changeStatus = () => {

    }

    useEffect(() => {
        getAll().then(data => {
            orderDetails.setOrders(data)
        })
    }, [])
    return (
        <div className={s.root}>
            <h4>Список заказов</h4>
            <div className={s.root__table}>
                <div className={s.root__header}>
                    <p><b>ID</b></p>
                    <p><b>Дата</b></p>
                    <p><b>Пользователь</b></p>
                    <p><b>Номер</b></p>
                    <p><b>Статус</b></p>
                    <p><b>Изменить статус</b></p>
                </div>
                {orderDetails.orders.map(item =>
                    <Order order={item} change={changeStatus}/>
                )}

            </div>
        </div>
    );
});

export default Orders;