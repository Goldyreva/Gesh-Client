import React, {useContext, useEffect} from 'react';
import Footer from "../../components/footer/Footer";
import s from "./Admin.module.sass"
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Orders from "../../components/admin/orders/Orders";
import Types from "../../components/admin/types/Types";
import Feedback from "../../components/admin/feedbacks/Feedbacks";
import Rooms from "../../components/admin/rooms/Rooms";
import {getAll} from "../../http/orderApi";

const Admin = observer( () => {
    let {admin, orderDetails} = useContext(Context)
    useEffect(() => {
        getAll().then(data => {
            orderDetails.setOrders(data)
        })
    }, [])
    return (
        <div className={s.root}>
            <div className={s.root__admin_cont}>
                <div className={s.root__header}>
                    <p onClick={() => admin.setActive(1)}>Заказы</p>
                    <p onClick={() => admin.setActive(2)}>Обратная связь</p>
                    <p onClick={() => admin.setActive(3)}>Номера</p>
                    <p onClick={() => admin.setActive(4)}>Типы</p>
                </div>
                <div className={s.root__main}>
                    {admin.isActive === 1
                        ? <Orders/>
                        : admin.isActive === 2
                            ? <Feedback/>
                            : admin.isActive === 3
                                ? <Rooms/>
                                : admin.isActive === 4
                                    ? <Types/>
                                    : <Orders/>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
});

export default Admin;