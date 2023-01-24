import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Orders.module.sass";
import {Context} from "../../../index";
import Order from "./order/Order";
import {updateStatus} from "../../../http/orderApi";

const Orders = observer( () => {
    let {orderDetails} = useContext(Context)

    const changeStatus = async (id, status) => {
        let data = updateStatus(id, status)
        orderDetails.setStatus(id, status)
        console.log(data)
    }

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