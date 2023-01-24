import React, {useContext, useEffect, useState} from 'react';
import s from "./Order.module.sass";
import Confirm from "../../confirm/Confirm";
import {Context} from "../../../../index";
import {userInfo} from "../../../../http/userApi";


const Order = ({order, change}) => {
    const {user, item} = useContext(Context)

    const [active, setActive] = useState(false)
    let info = {
        id: order.id,
        title: `Удалить тип "${order.name}"?`,
        btn: 'Удалить'
    }
    let thisUser
    let thisItem

    useEffect(() => {
        userInfo(order.userId).then(data => {
            thisUser = data
        })
        item.items.map((i) => {
            if(i.id === order.itemId){
                thisItem = i
            }
            console.log(thisUser)
        })
        // console.log(thisUser, thisItem)
    }, [])
    return (
        <div key={order.id} className={s.root}>
            <Confirm active={active} setActive={() => setActive(!active)} info={info} change={change}/>
            <p>{order.id}</p>
            <p>{`${order.start_date} - ${order.end_date}`}</p>
            <p>{order.name}</p>
            <p onClick={() => setActive(true)} className={s.root__delete_btn}>Удалить</p>
        </div>
    );
};

export default Order;