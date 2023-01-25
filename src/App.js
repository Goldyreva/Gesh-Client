import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/Header";
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Menu from "./components/menu/Menu";
import Hamburger from "./components/hamburger/Hamburger";
import Modal from "./components/modal/Modal";
import Cart from "./components/cart/Cart";
import OrderDetails from "./components/orderDetails/orderDetails";
import Barcode from "./components/barcode/Barcode";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import {getAll} from "./http/typeApi";
import {getAll as getAllItem} from "./http/roomApi"
import {getForUser} from "./http/orderApi";
import {$authHost, $host} from "./http";
import axios from "axios";

const App = observer(() => {
    const {user, cart, orderDetails, item} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const [countFetch, setCountFetch] = useState(0)

    useEffect(()=>{
        let endpoint = [
            `/api/type/getAll`,
            `/api/item/getAll`
        ]
        Promise.all(endpoint.map(endpoint => $authHost.get(endpoint)))
            .then(([{data: types}, {data: items}]) => {
                item.setTypes(types)
                item.setIsItem(items)
            }).finally(() => {setCountFetch(countFetch => countFetch + 1)})

        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            let endpointAuth = [
                `api/order/getAll`,
                `api/order/getForUser?userId=${user.user.id}`
            ]
            Promise.all(endpointAuth.map(endpoint => $authHost.get(endpoint)))
                .then(([{data: orders}, {data: ordersUser}]) => {
                    orderDetails.setOrders(orders)
                    orderDetails.setOrdersUser(ordersUser)
                    ordersUser.map(i => {i.status === "Корзина" && cart.addToCart(i)})
                }).finally(() => {setCountFetch(countFetch => countFetch + 1)})
        })
    }, [])

    if(!user.isAuth && countFetch < 1) {
        return <h2>Загрузка...</h2>
    }
    if (user.isAuth && countFetch < 2){
        return <h2>Загрузка...</h2>
    }
    return (
        <BrowserRouter>
        <Menu/>
        <Hamburger/>
        <Header/>

        <AppRouter/>
        <Modal/>
        <Cart/>
        <OrderDetails/>
        <Barcode/>

        </BrowserRouter>
    );
})

export default App;