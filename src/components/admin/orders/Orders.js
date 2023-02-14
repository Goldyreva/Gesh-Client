import React, {useContext, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Orders.module.sass";
import {Context} from "../../../index";
import Order from "./order/Order";
import {updateStatus} from "../../../http/orderApi";
import {confirm, refund} from '../../../http/paymentsApi'

const Orders = observer( () => {
    let {orderDetails} = useContext(Context)

    const changeStatus = async (id, status, payment_id, userId) => {
        switch (status) {
            case 'Обработан':
                confirm({
                    payment_id: payment_id,
                    userId: userId
                })
                orderDetails.setStatus(id, status)
                break
            case 'Отменен':
                refund({
                    payment_id: payment_id
                })
                orderDetails.setStatus(id, status)
                break
            case 'Завершен':
                updateStatus(id, status)
                orderDetails.setStatus(id, status)
                break
        }
    }

    let sortedList = useMemo(() => {
        let list = [...orderDetails.orders].sort((a, b) => {
            if(a.status === 'Обработан' && b.status !== 'Обработан') {
                return -1
            }

            if(a.status === 'Обработан' && b.status === 'Обработан') {
                return 0
            }

            if(a.status !== 'Обработан' && b.status === 'Обработан') {
                return 1
            }

        })

        return list.sort((a, b) => {
            if(a.status === 'Новый' && b.status !== 'Новый') {
                return -1
            }

            if(a.status === 'Новый' && b.status === 'Новый') {
                return 0
            }

            if(a.status !== 'Новый' && b.status === 'Новый') {
                return 1
            }
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
                {sortedList.map(item =>
                    <Order order={item} change={changeStatus} key={item.id}/>
                )}

            </div>
        </div>
    );
});

export default Orders;