import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import s from "./Orders.module.sass";
import {Context} from "../../../index";

const Orders = observer( () => {
    let {orderDetails, barcode, user} = useContext(Context)
    return (
        <div className={s.root}>
            {user.user.role === "ADMIN"
                ?

                <div className={s.root__orders}>
                    {
                        orderDetails.orders.map(item =>
                            <div className={s.root__order_content}>
                                <div className={`${s.root__order_grid} ${s.grid_header}`}>
                                    <div><span>Номер заказа</span></div>
                                    <div><span>Статус</span></div>
                                    <div><span>Подробности</span></div>
                                    <div><span>QR-код</span></div>
                                </div>

                                <div className={s.root__order_grid}>
                                    <div>{item.number}</div>
                                    <div>{item.status}</div>
                                    <div><a onClick={() => {
                                        orderDetails.setActive(true)
                                        orderDetails.setId(item.id)
                                    }}>Перейти</a></div>
                                    <div><a onClick={() => {
                                        barcode.setActive(true)
                                        barcode.setId(item.id)
                                    }}>Открыть</a></div>
                                </div>
                            </div>
                        )
                    }
                </div>

                :
                <p>Нет прав доступа</p>
            }
        </div>
    );
});

export default Orders;