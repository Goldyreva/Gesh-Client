import React, {useContext, useState} from 'react';
import s from "./Order.module.sass";
import StatusConfirm from "../../confirm/StatusConfirm";
import {Context} from "../../../../index";
import CalendarDropdown from "../../../calendarDropdown/CalendarDropdown";
import {update} from "../../../../http/orderApi";


const Order = ({order, change}) => {
    const {item} = useContext(Context)

    const [active, setActive] = useState(false)
    const [statusValue, setStatusValue] = useState('')

    const addAllData = (item) => {
        order.start_date = item.startDate
        order.end_date = item.endDate
        order.count_day = item.countDay
        update(order.id, order.start_date, order.end_date, order.count_day, order.status)
    }

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
        }
    })
    return (
        <div key={order.id} className={s.root}>
            <StatusConfirm active={active} setActive={() => setActive(!active)} info={info} change={change}/>
            <p>{order.id}</p>
            <CalendarDropdown id={order.id} data={order} add={addAllData}/>
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
            <ul>
                {
                    order.status === "Новый"
                        ? <> <li onClick={() => {
                            setActive(true)
                            setStatusValue('Обработан')
                        }
                        } className={s.root__delete_btn}>Обработан</li>
                        <li onClick={() => {
                            setActive(true)
                            setStatusValue('Завершен')
                        }
                        } className={s.root__delete_btn}>Завершен</li>
                        <li onClick={() => {setActive(true)
                        setStatusValue('Отменен')}
                        } className={s.root__delete_btn}>Отменен</li> </>
                    : order.status === "Обработан"
                        ? <> <li onClick={() => {
                                setActive(true)
                                setStatusValue('Завершен')
                            }
                            } className={s.root__delete_btn}>Завершен</li>
                            <li onClick={() => {setActive(true)
                                setStatusValue('Отменен')}
                            } className={s.root__delete_btn}>Отменен</li> </>
                            : <li> </li>

                }
            </ul>
        </div>
    );
};

export default Order;