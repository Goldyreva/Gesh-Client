import React, {useContext, useState} from 'react';
import s from "./Order.module.sass";
import StatusConfirm from "../../confirm/StatusConfirm";
import {Context} from "../../../../index";


const Order = ({order, change}) => {
    const {item} = useContext(Context)

    const [active, setActive] = useState(false)
    const [statusValue, setStatusValue] = useState('')
    let info = {
        id: order.id,
        title: `Изменить статус заказа "${order.id}" на ${statusValue}?`,
        status: statusValue,
        btn: 'Изменить'
    }
    let thisItem

    item.items.map((i) => {
        if (i.id === order.itemId) {
            thisItem = i
            console.log(thisItem)
        }
    })
    return (
        <div key={order.id} className={s.root}>
            <StatusConfirm active={active} setActive={() => setActive(!active)} info={info} change={change}/>
            <p>{order.id}</p>
            <p>{`${order.start_date} - ${order.end_date}`}</p>
            <ul>
                <li>ФИО: {order.user.name}</li>
                <li>E-mail: {order.user.email}</li>
                <li>Телефон: {order.user.phone}</li>
            </ul>
            <ul>
                <li>ID: {thisItem.id}</li>
                <li>{thisItem.name}</li>
                <li>Кол-во людей: {thisItem.count_people}</li>
                <li>{thisItem.price} руб/сутки</li>
            </ul>
            <p>{order.status}</p>
            <p>
                {
                    order.status === "Новый"
                        ? <> <p onClick={() => {
                            setActive(true)
                            setStatusValue('Обработан')
                        }
                        } className={s.root__delete_btn}>Обработан</p>
                        <p onClick={() => {
                            setActive(true)
                            setStatusValue('Завершен')
                        }
                        } className={s.root__delete_btn}>Завершен</p>
                        <p onClick={() => {setActive(true)
                        setStatusValue('Отменен')}
                        } className={s.root__delete_btn}>Отменен</p> </>
                    : order.status === "Обработан"
                        ? <> <p onClick={() => {
                                setActive(true)
                                setStatusValue('Завершен')
                            }
                            } className={s.root__delete_btn}>Завершен</p>
                            <p onClick={() => {setActive(true)
                                setStatusValue('Отменен')}
                            } className={s.root__delete_btn}>Отменен</p> </>
                            : <p> </p>

                }
            </p>
        </div>
    );
};

export default Order;