import React, {useContext, useEffect, useState} from 'react';
import s from "./Cart.module.sass";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CalendarDropdown from "../calendarDropdown/CalendarDropdown";
import {deleteOrder, update} from "../../http/orderApi";
import {create} from "../../http/paymentsApi"
import {$authHost} from "../../http";

const Cart = observer(() => {
    let {cart, item, orderDetails, user} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const [cost, setCost] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

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

    const deleteCartItem = (id) => {
        setLoading(true)
        deleteOrder(id)
            .then(data => {
                let endpointAuth = [
                    `api/order/getAll`,
                    `api/order/getForUser?userId=${user.user.id}`
                ]
                Promise.all(endpointAuth.map(endpoint => $authHost.get(endpoint)))
                    .then(([{data: orders}, {data: ordersUser}]) => {
                        orderDetails.setOrders(orders)
                        orderDetails.setOrdersUser(ordersUser)
                        cart.clearCart()
                        ordersUser.map(i => {i.status === "Корзина" && cart.addToCart(i)})
                        updateCost()
                        setLoading(false)
                    })
            })
    }

    const pay = () => {
        let error = 0
        if (cart.getCart.length === 0) {
            error++
            setErrorMessage("Пустая корзина")
        }
        cart.getCart.map(i => {
            if (i.end_date === "1970-01-01T00:00:00.000Z" || i.end_date === "") {
                error++
                setErrorMessage("Укажиие конечную дату аренды")
            }
        })

        if (error === 0) {
            setErrorMessage("")
            setLoading(true)

            let ids = ''

            cart.getCart.map(i => {
                ids += `${i.id},`
            })

            create({
                price: cost,
                id: ids,
                userId: user.user.id
            }).then(data => {
                let token = data.confirmation.confirmation_token
                let id = data.id
                window.location = `${window.location.origin}/payment/${id}_${token}`
            })
        }
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
                    {loading
                        ?   <div className={s.lds_ring}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        :   cart.getCart.map(i =>
                                <div className={s.root__summary_top} key={i.id}>
                                    <div className={s.root__summary_header}>
                                        <p>{item.items.filter(item => item.id === i.itemId)[0].name}</p>
                                        <div className={`${s.root__header_close} ${s.root__summary_top_close_top} ${s.root__summary_top_close}`} onClick={() => deleteCartItem(i.id)}>
                                            <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <CalendarDropdown id={i.id} data={i} add={addAllData}/>
                                    <div className={`${s.root__header_close} ${s.root__summary_top_right} ${s.root__summary_top_close}`} onClick={() => deleteCartItem(i.id)}>
                                        <svg className={s.root__header_img} fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            )
                    }

                    <h4>ИТОГО: {cost} руб.</h4>
                </div>
                {!loading
                    && <div className={s.root_reg} onClick={() => {
                        !loading && pay()
                    }}>
                        <p className={s.root__btn_submit}>Оплатить</p>
                    </div>
                }
                <p className={s.root__error}>{errorMessage}</p>
            </div>
        </div>
    );
});

export default Cart;