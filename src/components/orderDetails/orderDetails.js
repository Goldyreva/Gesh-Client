import React, {useContext, useEffect, useState} from 'react';
import s from "./orderDetails.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const OrderDetails = observer(() => {
    let {orderDetails, item} = useContext(Context)
    const [thisOrder, setThisOrder] = useState({})
    const [thisRoom, setThisRoom] = useState({})
    const [thisType, setThisType] = useState({})
    useEffect(() => {
        orderDetails.orders.forEach((item) => {
            if(item.id === orderDetails.isId){
                setThisOrder(item)
            }
        })
    }, [orderDetails.isId])

    useEffect(() => {
        item.items.forEach((item) => {
            if(item.id === thisOrder.itemId){
                setThisRoom(item)
            }
        })
    }, [thisOrder])

    useEffect(() => {
        item.types.forEach((item) => {
            if(item.id === thisRoom.typeId){
                setThisType(item)
            }
        })
    }, [thisRoom])

    return(

        <div className={orderDetails.isActive ? `${s.root} ${s.active}` : `${s.root}`} onClick={() => orderDetails.setActive(false)}>
            <div className={s.root__modal_content} onClick={e =>e.stopPropagation()}>
                <div className={s.root__header}>
                    <h2>Ваш заказ</h2>
                    <div className={s.root__header_close} onClick={() => orderDetails.setActive(false)}>
                        <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.root__info_cont}>
                    <p><b>Номер заказа:</b> {thisOrder.number}</p>
                    <p><b>Даты пребывания:</b> {`${new Date(thisOrder.start_date).toLocaleDateString('ru-RU')} - ${new Date(thisOrder.end_date).toLocaleDateString('ru-RU')}`}</p>
                    <p><b>Дата создания заказа:</b> {new Date(thisOrder.createdAt).toLocaleDateString('ru-RU')}</p>
                    <p><b>Статус:</b> {thisOrder.status}</p>
                    <p><b>Объект:</b> {thisRoom.name}</p>
                    <p><b>Тип номера: </b>{thisType.name}</p>
                    <p><b>Стоимость/день:</b> {thisRoom.price}</p>
                </div>
            </div>
        </div>
    );
});

export default OrderDetails;