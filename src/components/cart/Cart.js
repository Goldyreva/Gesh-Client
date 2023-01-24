import React, {useContext, useEffect, useState} from 'react';
import s from "./Cart.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CalendarDropdown from "../calendarDropdown/CalendarDropdown";
import {update} from "../../http/orderApi";

const Cart = observer(() => {
    let {cart, item, orderDetails, user} = useContext(Context)

    const [cost, setCost] = useState(0)

    const updateCost = () => {
        let c = 0
        cart.getCart.map(i => {
            c += item.items.find(item => item.id === i.itemId).price * i.count_day
        })
        setCost(c)
    }

    useEffect(() => {
        updateCost()
    }, [])

    const addAllData = (item) => {
        let order = cart.getCart.find(o => o.id === item.id)
        order.start_date = item.startDate
        order.end_date = item.endDate
        order.count_day = item.countDay
        update(order.id, order.start_date, order.end_date, order.count_day, order.status)
        updateCost()
    }

    const pay = () => {
        console.log('Pay')
    }

    return(
        <div className={cart.isActive ? `${s.root} ${s.active}` : `${s.root}`} onClick={() => cart.setActive(false)}>
            <div className={s.root__modal_content} onClick={e =>e.stopPropagation()}>
                <div className={s.root__header}>
                    <h2>Ваш заказ</h2>
                    <div className={s.root__header_close} onClick={() => cart.setActive(false)}>
                        <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                        </svg>
                    </div>
                </div>
                <div className={s.root__summary}>
                    {cart.getCart.map(i =>
                    <div className={s.root__summary_top} key={i.id}>
                        <p>{item.items.filter(item => item.id === i.itemId)[0].name}</p>
                        <CalendarDropdown id={i.id} data={i} add={addAllData}/>
                    </div>
                    )}
                    <h4>ИТОГО: {cost} руб.</h4>
                </div>
                <div className={s.root_reg} onClick={() => pay()}>
                    <p className={s.root__btn_submit}>Оплатить</p>
                </div>
            </div>
        </div>
    );
});

export default Cart;